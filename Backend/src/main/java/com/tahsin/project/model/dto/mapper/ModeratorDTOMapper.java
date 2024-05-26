package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.response.ModeratorCommunityResponse;
import com.tahsin.project.model.dto.request.ModeratorRequest;
import com.tahsin.project.model.dto.response.ModeratorResponse;
import com.tahsin.project.model.entity.Moderator;
import com.tahsin.project.model.enums.AccountType;
import org.springframework.stereotype.Service;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ModeratorDTOMapper implements Function<Moderator, ModeratorResponse> {

    @Override
    public ModeratorResponse apply(Moderator moderator) {
        return new ModeratorResponse(
                moderator.getId(),
                moderator.getName(),
                moderator.getUsername(),
                moderator.getEmail(),
                moderator.getGender(),
                moderator.getCommunities().
                        stream().
                        map(community ->
                                new ModeratorCommunityResponse(
                                        community.getName(),
                                        community.getDescription())).collect(Collectors.toList()),
                moderator.getProfilePicture()
        );
    }

    public Moderator moderatorRequestToModerator(ModeratorRequest request) {
        Moderator moderator = new Moderator();
        moderator.setName(request.name());
        moderator.setUsername(request.username());
        moderator.setEmail(request.email());
        moderator.setPassword(request.password());
        moderator.setPhoneNumber(request.phoneNumber());
        moderator.setProfilePicture(request.profilePicture());
        moderator.setAccountType(AccountType.MODERATOR_ACTIVE);
        moderator.setGender(request.gender());
        moderator.setProfilePicture(request.profilePicture());
        return moderator;
    }

}
