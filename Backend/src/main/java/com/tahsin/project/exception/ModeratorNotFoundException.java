package com.tahsin.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ModeratorNotFoundException extends RuntimeException {
    public ModeratorNotFoundException(String message) {
        super(message);
    }
}
