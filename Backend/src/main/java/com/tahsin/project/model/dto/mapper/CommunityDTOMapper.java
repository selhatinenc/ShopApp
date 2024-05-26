package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.response.CommunityModeratorResponse;
import com.tahsin.project.model.dto.request.CommunityRequest;
import com.tahsin.project.model.dto.response.CommunityResponse;
import com.tahsin.project.model.entity.Community;
import org.springframework.stereotype.Service;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CommunityDTOMapper implements Function<Community, CommunityResponse> {


    @Override
    public CommunityResponse apply(Community community) {
        return new CommunityResponse(
                community.getName(),
                community.getDescription(),
                community.getModerators().stream()
                        .map(moderator ->
                                new CommunityModeratorResponse(
                                        moderator.getId(),
                                        moderator.getName(),
                                        moderator.getPhoneNumber())).collect(Collectors.toList()));
    }

    public Community mapCommunityRequestToCommunity(CommunityRequest request) {
        Community community = new Community();
        community.setName(request.name());
        community.setDescription(request.description());
        return community;
    }

}
