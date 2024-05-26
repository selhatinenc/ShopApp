package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.request.MerchantRequest;
import com.tahsin.project.model.dto.response.MerchantResponse;
import com.tahsin.project.model.entity.Merchant;
import com.tahsin.project.model.enums.AccountType;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class MerchantDTOMapper implements Function<Merchant, MerchantResponse> {
    @Override
    public MerchantResponse apply(Merchant merchant) {
        return new MerchantResponse(
                merchant.getId(),
                merchant.getName(),
                merchant.getEmail(),
                merchant.getPassword(),
                merchant.getAccountType(),
                merchant.getProducts()
        );
    }
    public Merchant MerchantRequestToMerchant(MerchantRequest request){
         Merchant merchant = new Merchant();
         merchant.setName(request.name());
         merchant.setEmail(request.email());
         merchant.setPassword(request.password());
         merchant.setPhoneNumber(request.phoneNumber());
         merchant.setAccountType(AccountType.MERCHANT_PASSIVE);
         return merchant;
    }

}
