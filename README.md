# ✍️ MNIST Digit Recognition (From Scratch in React)

A browser-based handwritten digit recognition app built with **React** and a **neural network implemented entirely from scratch in JavaScript** — no ML libraries required.

Train your own model using MNIST CSV data, test its accuracy, and recognize **single or multiple handwritten digits drawn on canvas**.

---

## 🚀 Features

### 🧠 Neural Network (From Scratch)
- Fully implemented in JavaScript
- No TensorFlow / PyTorch
- Feedforward + backpropagation
- Sigmoid activation function
- Configurable architecture (784 → 200 → 10)

### 🖌️ Interactive Drawing Canvas
- Draw digits directly in the browser
- Supports **multi-digit recognition**
- Smooth brush rendering
- Real-time prediction

### 🧩 Image Processing Pipeline
- Automatic digit segmentation
- Bounding box detection
- Resize to **28×28 (MNIST format)**
- Pixel normalization

### 📊 Training & Testing
- Upload MNIST CSV datasets
- Train directly in the browser
- Track training progress
- Evaluate model accuracy

---

## 🏗️ Project Structure


project/
│
├── core/
│ ├── neuralNetwork.js # Neural network implementation
│ └── matrixOps.js # Matrix math utilities
│
├── utils/
│ └── imageProcessor.js # Digit segmentation & preprocessing
│
├── App.js # React UI + logic
└── README.md


---

## 🧰 Tech Stack

- React
- JavaScript (ES6+)
- HTML5 Canvas API

---

## ⚡ Getting Started

### 1️⃣ Install Dependencies

```
npm install
```
2️⃣ Run the App
npm start

App will be available at:

http://localhost:3000
📂 Dataset Setup

This app expects MNIST CSV format:

Each row:

label,pixel1,pixel2,...,pixel784
Example:
5,0,0,12,255,...,34
Steps:
Upload training dataset CSV
Click Train
Upload test dataset CSV
Click Test
🧠 Neural Network Architecture
Input Layer:    784 nodes (28×28 pixels)
Hidden Layer:   200 nodes
Output Layer:   10 nodes (digits 0–9)
Activation:     Sigmoid
Learning Rate:  0.1
## 🔍 How It Works
1. Training
Data loaded from CSV
Inputs normalized to range 0.01 – 1.0
Backpropagation updates weights
2. Testing
Model predicts on test dataset
Accuracy is calculated and displayed
3. Drawing Recognition
✏️ Step-by-step:
User draws on canvas
Image is scanned column-wise
Digits are segmented automatically
Each segment:
Cropped
Centered
Resized to 28×28
Neural network predicts each digit
Outputs combined into a full number
🧩 Core Components
🔢 MatrixOps
Random weight initialization (normal distribution)
Dot product
Matrix transpose
🧠 NeuralNetwork
Feedforward computation
Backpropagation training
Weight updates
🖼️ ImageProcessor
Digit segmentation
Bounding box detection
MNIST-style formatting
Pixel extraction
## 🎯 Usage Tips
Draw digits clearly and spaced apart
Avoid overlapping digits for best segmentation
Train with sufficient data for better accuracy
Use both training and test datasets
## 📈 Example Workflow
Upload mnist_train.csv
Click Train
Upload mnist_test.csv
Click Test → see accuracy
Draw digits → click Recognize
## 🔐 Notes
Runs entirely in the browser (no backend)
Training may take time depending on dataset size
Performance depends on your device
## 🚧 Future Improvements
Add support for saving/loading trained models
Improve digit segmentation accuracy
Add CNN-based architecture
Optimize training performance (Web Workers)
Improve UI/UX
## 📄 License

MIT License

## 🙌 Acknowledgements
MNIST dataset
