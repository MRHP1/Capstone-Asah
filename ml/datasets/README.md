# Telco Customer Behavior Dataset

## Description

This dataset contains customer behavior records used for building a Next
Best Offer recommendation model in the telecommunications domain. The
data represents usage patterns such as mobile data consumption, call
duration, spending levels, device types, and customer interaction
history.

The dataset can be used for: - Customer behavior analysis - Predictive
modeling - Recommendation systems - Segmentation and classification
tasks

## File Format

The dataset is provided in CSV format with tabular structure.

## Columns

-   customer_id: Unique identifier for each customer\
-   plan_type: Type of customer package (e.g., Prepaid, Postpaid)\
-   device_brand: Brand of the customer's device\
-   avg_data_usage_gb: Average monthly data usage in gigabytes\
-   pct_video_usage: Fraction of data used for video content (0-1)\
-   avg_call_duration: Average voice call duration in minutes\
-   sms_freq: Number of SMS sent per month\
-   monthly_spend: Monthly spending in local currency\
-   topup_freq: Top-up frequency for prepaid users\
-   travel_score: Mobility indicator (0-1)\
-   complaint_count: Number of customer complaints\
-   target_offer: Label representing recommended product offer

## Example Entry

customer_id: C00001\
plan_type: Prepaid\
device_brand: Realme\
avg_data_usage_gb: 1.5\
pct_video_usage: 0.804146\
avg_call_duration: 7.98\
sms_freq: 13\
monthly_spend: 70000\
topup_freq: 4\
travel_score: 0.284418\
complaint_count: 0\
target_offer: General Offer
