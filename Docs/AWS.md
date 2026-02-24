# AWS - Amazon Web Services  

Amazon Web Services (AWS) is a **cloud computing platform** provided by **Amazon** that offers on-demand computing resources like servers, storage, databases, and networking.

### Principles:

- On-demand delivery of IT solution
- pay-as-you-go pricing
- No upfront hardware cost
- High availability

#### Simple Example:
Instead of:
- Buying a physical computer (server)
- Setting it up in your office
- Maintaining it, fixing hardware issues
 
We can:
- Go to AWS
- Rent a virtual server
- Pay only for what you use

It’s like **renting electricity** instead of building your own **power plant**.

---
# Core AWS services 

## IAM - Identity Access Management 
It is **permission system** of AWS 

IAM work as,
- Security guard
- Access control
- permission manager of AWS

without **IAM** anyone could **delete** your **entire infrastructure**

IAM ensures,
- Only authorized users access services
- Developers cannot access billing
- EC2 cannot access everything
- Least privilege principle

### Components of IAM 

1. IAM Users:
   - It is represents a **person** or **application**.
   - Each user gets Username,password,access key.
2. IAM Groups:
   - A **group** is collection of **users**.
   - Instead of give permission to each user, we assign **policies** to group
3. IAM Roles: Role gives temporary credentials.
   - Means we create one role and attach one policy to it and use them combine.
   - Commonly used for service-to-service communication.
4. IAM Policies:
    - Policy means permission document in form of JSON format.
    - It defines Effect(Allow/Deny), Action, Resource.

---

## EC2 - Elastic Compute Cloud 

It lets you rent **virtual computers** to run your applications. You pay only for what you use.

- Elastic: You can easily increase or decrease the number of instances or their size as your needs change.
- Compute: It provides the processing power, memory, and storage for your workloads.
- Cloud: It runs on AWS's massive, global data center infrastructure.

### Core components of EC2 instance

1. Amazon Machine Image (AMI)

- Pre-configured template for launching EC2 instances
- Contains OS, patches, and required software
- Can use AWS-provided or create custom AMIs

2. Instance Types

- Define hardware configuration (CPU, memory, storage, networking)
- Grouped into families based on use case:
  
  - t family – General purpose, burstable
  - m family – Balanced resources
  - c family – Compute optimized
  - r family – Memory optimized

3. Elastic Block Store (EBS) Volumes

- Persistent block-level storage for EC2
- Works like a virtual hard drive
- Can detach and attach to different instances

4. Security Groups

- Virtual firewall for EC2 instances
- Controls inbound and outbound traffic
- Rules based on protocol, port, and IP range

5. Key Pairs

- Public and private key for secure access
- Used to SSH into Linux EC2 instances
- Private key (.pem) must be stored securely

---

## Amazon EC2 Auto Scaling

Auto scaling is automatically adjusts **compute capacity** by adding or removing Amazon EC2 instances in response to **demand**.

Auto scaling group,

- Launches new EC2 instances
- Terminates extra EC2 instances
- Replaces unhealthy instances
- Maintains desired number of servers

Example:

Your app normally gets 100 users.
But during sale 10,000 users traffic come to website.

without ASG,
- server crashs
- high CPU requiment

with ASG,
- AWS automatically adds more instances
- Distributed traffic

---


## Elastic Load Balancing

Load Balancer is automatically distributes incoming application or network traffic across multiple targets—such as Amazon EC2 instances, containers, or IP addresses—within one or more Availability Zones.

### Types of Load Balancers

1. Application Load Balancer (ALB) – HTTP/HTTPS
2. Network Load Balancer (NLB) – TCP/UDP
3. Gateway Load Balancer

How Application Load Balancer works:

- Receives HTTP request
- Checks target group
- Routes to healthy EC2
- Performs health checks

