package com.tahsin.project.service;

import com.tahsin.project.exception.RewardNotFoundException;
import com.tahsin.project.model.dto.mapper.RewardDTOMapper;
import com.tahsin.project.model.dto.request.RewardRequest;
import com.tahsin.project.model.dto.response.RewardResponse;
import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Reward;
import com.tahsin.project.repository.RewardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RewardService {
    private final RewardRepository rewardRepository;
    private final RewardDTOMapper mapper;

    public RewardService(RewardRepository rewardRepository, RewardDTOMapper mapper) {
        this.rewardRepository = rewardRepository;
        this.mapper = mapper;
    }

    public RewardResponse getRewardById(Long id){
        return rewardRepository.findById(id).map(mapper).orElseThrow(()->new
                RewardNotFoundException("Reward could not find by id: "+id));
    }
    public Reward findRewardById(Long id){
        return rewardRepository.findById(id).orElseThrow(()->new
                RewardNotFoundException("Reward could not find by id: "+id));
    }

    public List<RewardResponse> getAllRewards() {
        return rewardRepository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    public Reward createReward(RewardRequest request) {
        Reward reward = mapper.RewardRequestToReward(request);
        return rewardRepository.save(reward);
    }


    public RewardResponse updateReward(Long id, RewardRequest request) {
        Reward reward = mapper.RewardRequestToReward(request); // TODO: Sadece requestten gelen veriler ile değiştiriyoruz.
        reward.setId(id);                                      // TODO: Guncel olanlar korunmuyor burayi degistir!!!
        return mapper.apply(rewardRepository.save(reward));    // TODO: Diger Service'leri de kontrol et!!!

    }

    @Transactional
    public void deleteReward(Long id) {
        rewardRepository.deleteById(id);
    }

    @Transactional
    public void deleteRewardFromCustomer(Long customerId){
        Customer customer = new Customer();
        customer.setId(customerId);
        List<Reward> rewards = rewardRepository.findAllByCustomer(customer);
        rewardRepository.deleteAll(rewards);
    }
}
