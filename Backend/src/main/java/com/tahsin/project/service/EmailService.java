package com.tahsin.project.service;

import com.tahsin.project.model.base.EntityBase;
import com.tahsin.project.model.dto.response.PasswordResponse;
import com.tahsin.project.model.entity.ConfirmationToken;
import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Merchant;
import com.tahsin.project.model.entity.Moderator;
import com.tahsin.project.repository.ConfirmationTokenRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    public EmailService(JavaMailSender javaMailSender, ConfirmationTokenRepository confirmationTokenRepository) {
        this.javaMailSender = javaMailSender;
        this.confirmationTokenRepository = confirmationTokenRepository;
    }


    @Async
    public <T extends EntityBase> void  sendEmail(T entity){
        ConfirmationToken confirmationToken = new ConfirmationToken(entity);

        //confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        if(entity instanceof Moderator) {
            mailMessage.setTo(((Moderator) entity).getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8080/moderator/confirm-account?token="+confirmationToken.getConfirmationToken());
        } else if(entity instanceof Merchant){
            mailMessage.setTo(((Merchant) entity).getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8080/merchant/confirm-account?token="+confirmationToken.getConfirmationToken());
        }else if(entity instanceof PasswordResponse){
            mailMessage.setTo(((PasswordResponse) entity).getCustomer().getEmail());
            mailMessage.setSubject(((PasswordResponse) entity).getRecoveryMessage());
            mailMessage.setText("Your password recovered! : "
                    +(((PasswordResponse) entity).getPassword()));

        }else {
            mailMessage.setTo(((Customer) entity).getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://localhost:8080/customer/confirm-account?token="+confirmationToken.getConfirmationToken());
        }
        javaMailSender.send(mailMessage);
        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
    }






}