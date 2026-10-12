package com.smartcanteen.repository;

import com.smartcanteen.entity.CustomerOrder;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<CustomerOrder> findByIdAndUserId(Long id, Long userId);

    @Query("""
        SELECT DISTINCT o
        FROM CustomerOrder o
        LEFT JOIN FETCH o.items i
        LEFT JOIN FETCH i.foodItem
        LEFT JOIN FETCH o.user
        ORDER BY o.createdAt DESC
        """)
    List<CustomerOrder> findAllWithItemsOrderByCreatedAtDesc();
}