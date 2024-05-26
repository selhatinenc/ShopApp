package com.tahsin.project.controller;

import java.util.List;

import com.tahsin.project.model.dto.request.ProductRequest;
import com.tahsin.project.model.dto.response.ProductPageResponse;
import com.tahsin.project.model.dto.response.ProductResponse;
import com.tahsin.project.service.InteractionService;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tahsin.project.model.entity.Product;
import com.tahsin.project.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
//    @Autowired
    private InteractionService interactionService;

    public ProductController(ProductService productService,
                             InteractionService interactionService) {
        this.productService = productService;
        this.interactionService = interactionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/interact")
    public ResponseEntity<Void> interactWithProduct(@RequestParam Long customerId, @RequestParam Long productId) {
        // Retrieve the product to get its category
        Product product = productService.findProductById(productId);

        interactionService.saveInteraction(customerId, product.getCategory().getId());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/recommendation")
    public ResponseEntity<List<Product>> getRecommendation(@RequestParam Long customerId) {
        List<Product> recommendedProducts = interactionService.getRecommendation(customerId);

        if (recommendedProducts != null) {
            return ResponseEntity.ok(recommendedProducts);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @GetMapping("/getName/{name}")
    public ResponseEntity<ProductResponse> getProductByName(@PathVariable String name) {
        ProductResponse response = productService.getProductByName(name);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/addToUserWishList/userName/{name}")
    public ResponseEntity<ProductResponse> assignToUserWishList(@PathVariable String name) {
        ProductResponse response = productService.getProductByName(name);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all/pages")
    public ResponseEntity<ProductPageResponse>
    getAllProductsPaginated(
            @RequestParam(value = "page", required = false,defaultValue = "0") int page
            , @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok(
                productService.getPaginatedAll(page, size)
        );
    }

    @GetMapping("/all/category/{categoryName}")
    public ResponseEntity<ProductPageResponse> getAllProductsByCategoryName(
            @RequestParam(value = "page", required = false,defaultValue = "0") int page
            , @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @PathVariable String categoryName) {
        ProductPageResponse responseList = productService.getPaginatedByCategoryName(page, size, categoryName);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/all/merchant/{merchantName}")
    public ResponseEntity<ProductPageResponse> getAllProductsByMerchantName(
            @RequestParam(value = "page", required = false,defaultValue = "0") int page
            , @RequestParam(value = "size", required = false, defaultValue = "10") int size
            ,@RequestParam String merchantName) {
        ProductPageResponse responseList = productService.getPaginatedByMerchantName(page,size,merchantName);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping()
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductRequest product) {
        ProductResponse updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully.");
    }
}
