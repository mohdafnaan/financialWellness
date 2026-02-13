
export const tipEmailTemplate = (day, tipContent) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Daily Financial Tip</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #2c3e50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    .day-badge {
      display: inline-block;
      background-color: #e74c3c;
      color: #ffffff;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 14px;
      margin-bottom: 20px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .tip-text {
      font-size: 18px;
      line-height: 1.6;
      color: #2c3e50;
      margin-bottom: 30px;
      font-weight: 500;
      background-color: #f9f9f9;
      padding: 20px;
      border-left: 5px solid #e74c3c;
      border-radius: 4px;
    }
    .footer {
      background-color: #ecf0f1;
      color: #7f8c8d;
      padding: 15px;
      text-align: center;
      font-size: 12px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Financial Wellness</h1>
    </div>
    <div class="content">
      <div class="day-badge">Day ${day} Tip</div>
      <div class="tip-text">
        "${tipContent}"
      </div>
      <p style="color: #7f8c8d; font-style: italic;">Small steps lead to big changes. See you tomorrow!</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Financial Wellness. All rights reserved.</p>
      <p>Building a better financial future, one day at a time.</p>
    </div>
  </div>
</body>
</html>
  `;
};
