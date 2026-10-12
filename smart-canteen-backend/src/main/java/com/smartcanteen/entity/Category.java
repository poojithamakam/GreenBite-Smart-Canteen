package com.smartcanteen.entity;
import jakarta.persistence.*;
@Entity @Table(name="categories",uniqueConstraints=@UniqueConstraint(columnNames="name"))
public class Category { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @Column(nullable=false,unique=true,length=80) private String name; @Column(length=500) private String description; @Column(nullable=false) private boolean active=true; public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;} }
