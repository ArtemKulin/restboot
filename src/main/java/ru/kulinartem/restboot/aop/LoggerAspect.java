package ru.kulinartem.restboot.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Aspect
@Service
public class Logger {

    org.slf4j.Logger log = LoggerFactory.getLogger(Logger.class);

   public Object applicationLogger (ProceedingJoinPoint point) {
       String methodName = point.getSignature().getName();
       String className = point.getTarget().getClass().toString();
       Object[] args = point.getArgs();
   }

}
