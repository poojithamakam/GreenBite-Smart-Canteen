package com.smartcanteen.repository;
import com.smartcanteen.entity.Payment; import org.springframework.data.jpa.repository.JpaRepository; import java.util.Optional;
public interface PaymentRepository extends JpaRepository<Payment,Long>{Optional<Payment> findByProviderOrderId(String id); Optional<Payment> findByOrderId(Long id);}
