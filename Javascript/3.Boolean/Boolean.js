"strict";

/*1: Create a function called verifyPassword*/
import bcrypt from "bcrypt";
const password = "QWEiop5991";
const hashedpassword = bcrypt.hashSync(password, 10);

function verifyPassword(enteredPassword, hashedPassword) {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
}
console.log(verifyPassword("QWEiop5991", hashedPassword));

/*2:Create a function called verifyMFA*/

function verifyMFA(inputMfaCode, correctMfaCode) {
  return inputMfaCode === correctMfaCode;
}

console.log(verifyMFA("123456", "123456"));

/*3:Create a function called checkBalance*/

function checkBalance(balance, withdrawalAmount) {
  return balance >= withdrawalAmount;
}
console.log(checkBalance(500, 300));
console.log(checkBalance(200, 300));

/*4: Create a function called checkDailyLimit*/

const dailyLimit = 5000;
const withdrawalAmount = 3000;

function checkDailyLimit(withdrawalAmount, dailyLimit) {
  if (withdrawalAmount <= dailyLimit) {
    return true;
  } else {
    return false;
  }
}

/*5 : Create A function called ProcessWithdrawal*/

function processWithdrawal(
  enteredPassword,
  inputMfaCode,
  withdrawalAmount,
  actualMfaCode,
  balance,
  dailyLimit,
  hashedPassword
) {
  // Step 1: Verify the password
  if (!verifyPassword(enteredPassword, hashedPassword)) {
    return "Transaction Failed: Incorrect password.";
  }

  // Step 2: Verify MFA
  if (!verifyMFA(inputMfaCode, actualMfaCode)) {
    return "Transaction Failed: MFA failed.";
  }

  // Step 3: Check balance
  if (!checkBalance(balance, withdrawalAmount)) {
    return "Transaction Failed: Insufficient balance.";
  }

  // Step 4: Check daily limit
  if (!checkDailyLimit(withdrawalAmount, dailyLimit)) {
    return "Transaction Failed: Amount exceeds daily limit.";
  }

  // Step 5: If all conditions are met, deduct the withdrawal amount
  balance -= withdrawalAmount;

  // Return success message
  return "Transaction Successful.";
}

/*CHALLENGE QUESTIONS*/

// 1:Password Authentication: Storing passwords in a hashed format ensures that even if a database is compromised, attackers cannot easily retrieve the original passwords.

// 2:Multi-Factor Authentication (MFA): MFA requires users to provide two or more verification factors (password and a one-time code), enhancing security by adding an extra layer beyond just the password. It helps prevent attacks like phishing, where attackers rely  on stolen passwords.

// 3:Balance Verification: Verifying the account balance before a withdrawal ensures that the user has sufficient funds. Skipping this step can lead to overdrafts or fraudulent transactions, exposing both the user and the system to financial risks and potential security breaches.

// 4:Daily Transaction Limit: A daily transaction limit helps minimize the damage from unauthorized or excessive withdrawals by setting a limit howmuch can be withdrawn within a given day. It protects accounts from large-scale fraud or hacking attempts by limiting potential financial loss.

// 5:Improvement (Fraud Detection): To detect fraud, you could track user behavior such as transaction frequency, withdrawal amounts, and geographic location. Anomalies like unusually large withdrawals, frequent transactions in short periods, or activities from uncommon locations can trigger alerts, helping to identify potential fraud patterns.
