package com.zxiaosi.common.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;

import java.lang.reflect.Field;
import java.util.*;

/**
 * 针对insert update操作对 创建时间 更新时间 删除标志 拦截填充
 *
 * @author zxiaosi
 * @date 2023-09-05 17:43
 */
@Slf4j
@Intercepts({@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})})
public class MyBatisOperateInterceptor implements Interceptor {

    private static final String CREATE_TIME = "createTime";
    private static final String UPDATE_TIME = "updateTime";
    private static final String IS_DELETED = "isDeleted";

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        MappedStatement statement = (MappedStatement) invocation.getArgs()[0];

        // 操作类型 只对 insert update 进行拦截 | sqlCommandType = {UNKNOWN, INSERT, UPDATE, DELETE, SELECT, FLUSH}
        SqlCommandType sqlCommandType = statement.getSqlCommandType();

        Object parameter = invocation.getArgs()[1];
        if (parameter == null) {
            return invocation.proceed();
        }

        if (SqlCommandType.INSERT.equals(sqlCommandType) || SqlCommandType.UPDATE.equals(sqlCommandType)) {
            Object arg = invocation.getArgs()[1];

            if (arg instanceof Map<?, ?>) {
                for (Object obj : ((Map<?, ?>) arg).values()) {
                    insertOrUpdateOperate(obj, sqlCommandType);
                }
            } else {
                insertOrUpdateOperate(arg, sqlCommandType);
            }
        }

        return invocation.proceed();
    }

    /**
     * 添加或者更新
     *
     * @param object         数据对象
     * @param sqlCommandType 操作行为 insert or update
     */
    private void insertOrUpdateOperate(Object object, SqlCommandType sqlCommandType) throws IllegalAccessException {
        if (object == null) {
            log.info("object set properties ,object must is not null");
            return;
        }

        // 获取所有属性
        List<Field> declaredFields = new ArrayList<>(Arrays.asList(object.getClass().getDeclaredFields()));
        if (object.getClass().getSuperclass() != null && object.getClass().getSuperclass() != Object.class) {
            // 当前类具有超类父类（所有类都是继承于Object 所以要排除掉）
            Field[] superClassFields = object.getClass().getSuperclass().getDeclaredFields();
            declaredFields.addAll(Arrays.asList(superClassFields));
        }

        // 添加
        for (Field declaredField : declaredFields) {
            declaredField.setAccessible(true);
            if (SqlCommandType.INSERT.equals(sqlCommandType)) {
//                System.out.println(declaredField.getName());
                switch (declaredField.getName()) {
                    case CREATE_TIME: // 创建时间
                    case UPDATE_TIME: // 更新时间
                        declaredField.set(object, new Date());
                        break;
                    case IS_DELETED:
                        // 删除标志
                        declaredField.set(object, 0);
                        break;
                    default:
                        break;
                }
            }

            if (SqlCommandType.UPDATE.equals(sqlCommandType)) {
                switch (declaredField.getName()) {
                    case UPDATE_TIME:
                        // 更新时间
                        declaredField.set(object, new Date());
                        break;
                    default:
                        break;
                }
            }
        }
    }


    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
