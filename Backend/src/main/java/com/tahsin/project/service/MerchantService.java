package com.tahsin.project.service;

import com.tahsin.project.exception.MerchantNotFoundException;
import com.tahsin.project.model.dto.mapper.MerchantDTOMapper;
import com.tahsin.project.model.dto.request.MerchantRequest;
import com.tahsin.project.model.dto.response.MerchantResponse;
import com.tahsin.project.model.entity.ConfirmationToken;
import com.tahsin.project.model.entity.Merchant;
import com.tahsin.project.model.enums.AccountType;
import com.tahsin.project.repository.ConfirmationTokenRepository;
import com.tahsin.project.repository.MerchantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MerchantService {
    private final MerchantRepository merchantRepository;
    private final MerchantDTOMapper mapper;
    private final EmailService emailService;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public MerchantService(MerchantRepository merchantRepository, MerchantDTOMapper mapper, EmailService emailService, ConfirmationTokenRepository confirmationTokenRepository) {
        this.merchantRepository = merchantRepository;
        this.mapper = mapper;
        this.emailService = emailService;
        this.confirmationTokenRepository = confirmationTokenRepository;
    }

     public Merchant createMerchant(MerchantRequest request) {
        Merchant merchant = this.mapper.MerchantRequestToMerchant(request);
        String password = merchant.getPassword();
        merchant.setPassword(this.passwordEncoder.encode(password));
        return (Merchant)this.merchantRepository.save(merchant);
    }

    public MerchantResponse getMerchantById(Long id){
        return merchantRepository.findById(id).map(mapper).orElseThrow(() -> new MerchantNotFoundException("Merchant could not find by id: "+id));
    }

    public MerchantResponse getMerchantByName(String name){
        return merchantRepository.findByNameIgnoreCase(name).map(mapper).orElseThrow(() -> new MerchantNotFoundException("Merchant could not find by name: "+name));
    }

    public Merchant findMerchantByName(String name){
        return merchantRepository.findByNameIgnoreCase(name).orElseThrow(() -> new MerchantNotFoundException("Merchant could not find by name: "+name));
    }

    public Merchant findMerchantById(Long id) {
        return merchantRepository.findById(id).orElseThrow(() -> new MerchantNotFoundException("Merchant could not find by id: "+id));
    }

    public List<MerchantResponse> getAllMerchants() {
        return merchantRepository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    public ResponseEntity<?> saveMerchant(MerchantRequest request) {

        Merchant merchant = mapper.MerchantRequestToMerchant(request);

        if (merchantRepository.existsByEmail(merchant.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        merchantRepository.save(merchant);
        emailService.sendEmail(merchant);

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            Merchant merchant = merchantRepository.findByEmailIgnoreCase(token.getMerchant().getEmail());
            merchant.setEnabled(true);
            merchant.setAccountType(AccountType.MERCHANT_ACTIVE);
            merchantRepository.save(merchant);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    public MerchantResponse updateMerchant(Long id, MerchantRequest request) {
        Merchant merchant = mapper.MerchantRequestToMerchant(request);
        merchant.setId(id);
        return mapper.apply(merchantRepository.save(merchant));
    }


    public void deleteMerchant(Long id) {
        merchantRepository.deleteById(id);
    }
}
