package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
public class App 
{
    private static final Logger logger = LoggerFactory.getLogger(App.class);

    @Value("${server.port}")
    private int serverPort;
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
        //
        //    SpringApplication app = new SpringApplication(App.class);
        // Environment env = app.run(args).getEnvironment();
        System.out.println( "Hello World!" );
        // System.out.println("\n----------------------------------------------------------\n\t" +
        //         "Application '{}' is running on port: {}\n----------------------------------------------------------\n" +
        //         env.getProperty("spring.application.name"),
        //         env.getProperty("server.port"));

        SpringApplication app = new SpringApplication(App.class);
        Environment env = app.run(args).getEnvironment();
        logger.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running on port: {}\n----------------------------------------------------------\n" +
                env.getProperty("com.example"),
                env.getProperty("server.port"));
    }
}

