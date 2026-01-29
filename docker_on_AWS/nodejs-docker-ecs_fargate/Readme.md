---

# 🚀 Node App Deployment to AWS ECS (Fargate)

This guide explains how to:

1. Create a Docker image
2. Push it to Docker Hub
3. Copy the image from Docker Hub to AWS ECR
4. Deploy the app using **ECS Fargate** with a **Load Balancer**

---

## 🧰 Prerequisites

* Ubuntu EC2 instance
* AWS account
* Docker Hub account
* IAM permissions for ECR, ECS, EC2, ELB
* AWS CLI configured (`aws configure`)

---

## 🔹 Step 1: Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
exit
```

Login again and verify:

```bash
docker ps
```

---

## 🔹 Step 2: Install AWS CLI v2

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

---

## 🔹 Step 3: Login to AWS ECR

```bash
aws ecr get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin 457650192798.dkr.ecr.us-east-1.amazonaws.com
```

---

## 🔹 Step 4: Pull Image from Docker Hub

```bash
docker pull allenaira/node_route:new
```

---

## 🔹 Step 5: Tag Image for ECR

```bash
docker tag allenaira/node_route:new \
457650192798.dkr.ecr.us-east-1.amazonaws.com/myrepo:latest
```

---

## 🔹 Step 6: Push Image to ECR

```bash
docker push 457650192798.dkr.ecr.us-east-1.amazonaws.com/myrepo:latest
```

---

## 🔹 Step 7: Create ECS Cluster (Fargate)

1. Go to **ECS → Clusters**
2. Click **Create Cluster**
3. Choose **Networking only (Fargate)**
4. Name the cluster
5. Create

---

## 🔹 Step 8: Create Task Definition

1. Go to **ECS → Task Definitions**
2. Click **Create new Task Definition**
3. Choose **Fargate**
4. Configure:

   * Task name
   * Task memory & CPU
5. Container configuration:

   * **Image**:
     `457650192798.dkr.ecr.us-east-1.amazonaws.com/myrepo:latest`
   * **Container name**: app-name
   * **Port mappings**:

     * Container port: `8000`
6. **Health Check**:

   * Command:

     ```bash
     CMD-SHELL, curl -f http://localhost:8000/health || exit 1
     ```
7. Click **Create**

---

## 🔹 Step 9: Create Service

1. Go to **ECS → Clusters → Your Cluster**
2. Click **Create Service**
3. Configure:

   * Launch type: **Fargate**
   * Task definition: select created task
   * Service name
4. Load Balancer:

   * Type: **Application Load Balancer**
   * Listener port: **80**
   * Target group port: **8000**
5. Enable **Auto Scaling** (optional)
6. Click **Create Service**

---

## 🔹 Step 10: Access the Application

1. Go to **EC2 → Load Balancers**
2. Copy the **DNS name**
3. Open in browser:

   ```text
   http://<load-balancer-dns>
   ```

---

## 🔹 Troubleshooting

* If app is not accessible:

  * Ensure **port 80** is open in the Load Balancer security group
  * Ensure **port 8000** is open in the ECS task security group
  * Verify container is listening on `8000`

---

## ✅ Result

Your Dockerized Node.js application is now:

* Stored in **ECR**
* Running on **ECS Fargate**
* Publicly accessible via **Load Balancer DNS**

---



