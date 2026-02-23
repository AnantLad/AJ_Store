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

1. IAM Users: It is represents a **person** or **application**.Each user gets Username,password,access key.
2. IAM Groups: A **group** is collection of **users**.Instead of give permission to each user, we assign **policies** to group
3. IAM Roles: Role gives temporary credentials. means we create one role and attach one policy to it and use them combine.Commonly used for service-to-service communication.
4. IAM Policies: Policy means permission document in form of JSON format.It defines Effect(Allow/Deny), Action, Resource.

---

## EC2 - Elastic Compute Cloud 

It lets you rent **virtual computers** to run your applications. You pay only for what you use.

- Elastic: You can easily increase or decrease the number of instances or their size as your needs change.
- Compute: It provides the processing power, memory, and storage for your workloads.
- Cloud: It runs on AWS's massive, global data center infrastructure.

### Core components of EC2 instance

1. Amazon Machine Image (AMI)

- Provides thousands of AMIs from AWS.Allows users to create custom AMIs for reuse and consistency
- Acts as a software blueprint containing the operating system, patches, and required software

2. Instance Types

- Instance types are the hardware profiles of your virtual server.
- AWS offers a vast array of instance types optimized for different tasks, grouped into families:

- t family (e.g., t2.micro, t3.large): General Purpose, burstable instances. Perfect for web servers, development environments, and small databases.
- m family (e.g., m5.xlarge): General Purpose, balanced instances with a good mix of CPU, memory, and networking.
- c family (e.g., c5.large): Compute Optimized, with a high ratio of CPU power to memory. Ideal for CPU-intensive tasks like batch processing, media transcoding, and scientific modeling.
- r family (e.g., r5.large): Memory Optimized, with a high ratio of memory to CPU. Used for memory-intensive applications like large databases or in-memory caches.

3. Elastic Block Store (EBS) Volumes

- Provides durable, block-level storage attached to EC2 instances
- Acts as a virtual hard drive for storing data
- Persists data independently and can be detached and reattached to different instances

4. Security Groups

- A Security Group acts as a virtual firewall for your EC2 instance, controlling all inbound and outbound traffic. 
- You define rules that specify which protocols (e.g., SSH, HTTP), ports (e.g., 22, 80), and IP address ranges are allowed to send traffic to or receive traffic from your instance.

5. Key Pairs

- A Key Pair, consisting of a public key and a private key, is the set of security credentials used to prove your identity when connecting to a Linux EC2 instance. 
- AWS stores the public key, and you are responsible for securely storing the private key file (.pem).
- You will use this private key to SSH into your instance.
