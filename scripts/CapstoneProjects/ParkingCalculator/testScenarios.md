# Test Scenarios for Parking Calculator

This document outlines the test scenarios for the Parking Calculator application.


## Scenario 1: Valet Parking (less than 5 hours)
- **Entry Time:** 09:00 AM
- **Exit Time:** 12:00 PM
- **Expected Cost:** $12.00 ($12 for five hours or less)

## Scenario 2: Valet Parking (more than 5 hours)
- **Entry Time:** 09:00 AM
- **Exit Time:** 03:00 PM
- **Expected Cost:** $18.00 ($18 per day)

## Scenario 3: Valet Parking (Overnight)
- **Entry Time:** 10:00 PM (Day 1)
- **Exit Time:** 08:00 AM (Day 2)
- **Expected Cost:** $18.00 ($18 per day)

## Scenario 4: Valet Parking - Invalid Input (Exit Before Entry)
- **Entry Time:** 05:00 PM
- **Exit Time:** 02:00 PM
- **Expected Cost:** $0


## | ------------------------------------------------------------------------------- |


## Scenario 5: Short-term Parking (1 hour)
- **Entry Time:** 09:00 AM
- **Exit Time:** 10:00 AM
- **Expected Cost:** $2.00 ($2.00 first hour)

## Scenario 6: Short-term Parking (1.5 hours)
- **Entry Time:** 09:00 AM
- **Exit Time:** 10:30 AM
- **Expected Cost:** $3.00 ($2.00 first hour; $1.00 each additional 1/2 hour)

## Scenario 7: Short-term Parking (2 hours)
- **Entry Time:** 09:00 AM
- **Exit Time:** 11:00 AM
- **Expected Cost:** $4.00 ($2.00 first hour; $1.00 each additional 1/2 hour)

## Scenario 8: Short-term Parking (Overnight but < 24 hours)
- **Entry Time:** 10:00 PM (Day 1)
- **Exit Time:** 08:00 AM (Day 2)
- **Expected Cost:** $20.00 ($2.00 first hour; $1.00 each additional 1/2 hour)

## Scenario 9: Short-term Parking (Overnight but = 24 hours)
- **Entry Time:** 09:00 AM (Day 1)
- **Exit Time:** 09:00 AM (Day 2)
- **Expected Cost:** $24.00 ($24.00 daily maximum)

## Scenario 10: Short-term Parking (Overnight but > 24 hours ~ 25.5 hours)
- **Entry Time:** 09:00 AM (Day 1)
- **Exit Time:** 10:30 AM (Day 2)
- **Expected Cost:** $27.00 ($24.00 daily maximum + $2.00 first hour; $1.00 each additional 1/2 hour)


## Scenario 11: Invalid Input (Exit Before Entry)
- **Entry Time:** 05:00 PM
- **Exit Time:** 02:00 PM
- **Expected :** ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time

