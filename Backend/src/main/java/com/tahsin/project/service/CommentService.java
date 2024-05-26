package com.tahsin.project.service;

import com.tahsin.project.exception.CommentNotFoundException;
import com.tahsin.project.model.dto.mapper.CommentDTOMapper;
import com.tahsin.project.model.dto.request.CommentRequest;
import com.tahsin.project.model.dto.response.CommentResponse;
import com.tahsin.project.model.entity.Comment;
import com.tahsin.project.repository.CommentRepository;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentDTOMapper mapper;

    public CommentService(CommentRepository commentRepository, CommentDTOMapper mapper) {
        this.commentRepository = commentRepository;
        this.mapper = mapper;
    }

    public CommentResponse getCommentById(Long id){
        return commentRepository.findById(id).map(mapper).orElseThrow(()-> new
                CommentNotFoundException("Comment could not find by id: "+id));
    }
    public Comment findCommentById(Long id){
        return commentRepository.findById(id).orElseThrow(()-> new
                CommentNotFoundException("Comment could not find by id: "+id));
    }

    public List<CommentResponse> getAllComments() {
        return commentRepository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    public Comment createComment(CommentRequest request) {
        return commentRepository.save(mapper.CommentRequestToComment(request));
    }

    public CommentResponse updateComment(Long id, CommentRequest request) {
        Comment comment = mapper.CommentRequestToComment(request);
        comment.setId(id);
        return mapper.apply(commentRepository.save(comment));
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public List<CommentResponse> getAllCommentsFromPost(Long postId) {
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getPost().getId().equals(postId))
                .map(mapper).collect(Collectors.toList());
    }

    public List<CommentResponse> getAllCommentsByPostName(String postName) {
        //commentRepository.findAll().stream()
         //       .filter(comment -> comment.getPost().)
        throw new NotImplementedException();
    }
}
