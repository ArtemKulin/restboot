package ru.kulinartem.restboot.aop;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class LoggerAspect {

    Logger log = LoggerFactory.getLogger(LoggerAspect.class);

    @Pointcut("execution(* ru.kulinartem.restboot.controller..*(..))")
    public void myPointcut() {
    }

    @Around("myPointcut()")
   public Object applicationLogger (ProceedingJoinPoint point) throws Throwable {
       ObjectMapper mapper = new ObjectMapper();
       String methodName = point.getSignature().getName();
       String className = point.getTarget().getClass().toString();
       Object[] args = point.getArgs();
       log.info("method invoked " + className + " : " + methodName + " arguments : " + mapper.writeValueAsString(args));
       Object obj = point.proceed();
       log.info(className + " : " + methodName + " Response : " + mapper.writeValueAsString(obj));
       return obj;
   }

}
