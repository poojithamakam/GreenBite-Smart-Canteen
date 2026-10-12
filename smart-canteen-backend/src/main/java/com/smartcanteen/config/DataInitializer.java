package com.smartcanteen.config;

import com.smartcanteen.entity.*;
import com.smartcanteen.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(
            CategoryRepository cats,
            FoodItemRepository foods,
            UserRepository users,
            PasswordEncoder encoder,
            @Value("${app.seed-admin.email:}") String adminEmail,
            @Value("${app.seed-admin.password:}") String adminPassword) {

        return args -> {
            for (String name : List.of(
                    "Breakfast", "Lunch", "Snacks", "Beverages", "Desserts")) {
                if (cats.findByNameIgnoreCase(name).isEmpty()) {
                    Category category = new Category();
                    category.setName(name);
                    category.setDescription(name + " menu");
                    cats.save(category);
                }
            }

            if (foods.count() == 0) {
                add(foods, cats, "Masala Dosa", "Crispy dosa with potato filling", "55",
                        "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85", "Breakfast");
                add(foods, cats, "Idli Sambar", "Steamed idlis with sambar", "40",
                        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85", "Breakfast");
                add(foods, cats, "Veg Fried Rice", "Rice with fresh vegetables", "95",
                        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85", "Lunch");
                add(foods, cats, "Paneer Wrap", "Paneer and vegetables in a wrap", "85",
                        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85", "Lunch");
                add(foods, cats, "Crispy Samosa", "Golden pastry with potato filling", "25",
                        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85", "Snacks");
                add(foods, cats, "Veg Burger", "Crunchy vegetable patty burger", "70",
                        "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85", "Snacks");
                add(foods, cats, "Cold Coffee", "Chilled coffee", "50",
                        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85", "Beverages");
                add(foods, cats, "Fresh Lime Soda", "Refreshing lime drink", "30",
                        "https://images.unsplash.com/photo-1513558161293-cdefa6c3?auto=format&fit=crop&w=900&q=85", "Beverages");
                add(foods, cats, "Chocolate Brownie", "Rich chocolate brownie", "45",
                        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85", "Desserts");
                add(foods, cats, "Curd Rice", "Comforting curd rice", "60",
                        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85", "Lunch");
                add(foods, cats, "French Fries", "Crispy golden potato fries", "55",
                        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85", "Snacks");
                add(foods, cats, "Gulab Jamun", "Milk dumplings in fragrant syrup", "35",
                        "https://images.unsplash.com/photo-1666190092159-3b1e6c1c?auto=format&fit=crop&w=900&q=85", "Desserts");
            }

            // Create the configured admin, or promote an existing account.
            if (adminEmail != null && !adminEmail.isBlank()
                    && adminPassword != null && !adminPassword.isBlank()) {

                String normalizedEmail = adminEmail.trim().toLowerCase();

                AppUser admin = users.findByEmailIgnoreCase(normalizedEmail)
                        .orElseGet(() -> {
                            AppUser a = new AppUser();
                            a.setFullName("Canteen Administrator");
                            a.setEmail(normalizedEmail);
                            return a;
                        });

                admin.setPasswordHash(encoder.encode(adminPassword));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);
                users.save(admin);
            }
        };
    }

    private void add(
            FoodItemRepository foods,
            CategoryRepository cats,
            String name,
            String desc,
            String price,
            String image,
            String categoryName) {

        FoodItem food = new FoodItem();
        food.setName(name);
        food.setDescription(desc);
        food.setPrice(new BigDecimal(price));
        food.setImageUrl(image);
        food.setCategory(
                cats.findByNameIgnoreCase(categoryName).orElseThrow());
        food.setAvailable(true);
        foods.save(food);
    }
}