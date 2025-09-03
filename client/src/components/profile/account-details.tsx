import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Star, CreditCard } from "lucide-react";

export const AccountDetails: React.FC = () => {
  const accountDetails = {
    accountType: "Premium",
    memberSince: "January 15, 2023",
    lastLogin: "Today at 9:30 AM",
    loginLocation: "San Francisco, CA",
    deviceCount: 3,
    storageUsed: "2.4 GB",
    storageLimit: "10 GB",
    billingCycle: "Monthly",
    nextBillingDate: "June 15, 2024",
    paymentMethod: "Visa ending in 4242",
  };
  

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">Account Details</h2>
          <p className="text-default-500 text-small">
            Information about your account
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Account Type</span>
              <span className="font-medium flex items-center gap-1">
                {accountDetails.accountType}
                <Star className="text-warning" />
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Member Since</span>
              <span className="font-medium">{accountDetails.memberSince}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Last Login</span>
              <span className="font-medium">{accountDetails.lastLogin}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Location</span>
              <span className="font-medium">{accountDetails.loginLocation}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Active Devices</span>
              <span className="font-medium">{accountDetails.deviceCount}</span>
            </div>
            
            <Divider />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-default-500 text-small">Storage Used</span>
                <span className="font-medium">
                  {accountDetails.storageUsed} / {accountDetails.storageLimit}
                </span>
              </div>
              <div className="w-full bg-default-100 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(2.4/10)*100}%` }}
                ></div>
              </div>
            </div>
            
            <Divider />
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Billing Cycle</span>
              <span className="font-medium">{accountDetails.billingCycle}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Next Billing</span>
              <span className="font-medium">{accountDetails.nextBillingDate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-default-500 text-small">Payment Method</span>
              <span className="font-medium flex items-center gap-1">
                <CreditCard />
                {accountDetails.paymentMethod.split("Visa ")[1]}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};