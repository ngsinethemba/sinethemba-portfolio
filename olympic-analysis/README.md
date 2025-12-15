# Olympic Games Performance Analysis

## 📊 Project Overview

Comprehensive data analysis of Olympic Games participation and performance spanning over 100 years (1896-2022). This project applies statistical modeling and data visualization techniques to uncover patterns in athlete participation, medal distribution, and factors influencing national performance.

**Course:** SI 348 - Computational Social Science (Socio-Informatics)  
**Institution:** Stellenbosch University  
**Completed:** 2025

---

## 🎯 Research Questions

1. How have athlete participation and medal outcomes changed over time?
2. Which countries and sports dominate medal tallies?
3. What is the effect of hosting on national performance?
4. Can medal counts be explained by team size and host status?

---

## 📁 Dataset Structure

The analysis utilized four interconnected CSV files:

| Dataset | Description | Key Variables |
|---------|-------------|---------------|
| **athletes.csv** | Athlete metadata | name, year of birth, first Games, medals won |
| **hosts.csv** | Host information per Games | year, city, season, location |
| **medals.csv** | Medal-level records | event, gender, NOC, medal type |
| **results.csv** | Event results | rankings, times, scores |

**Total Records Analyzed:** 541,909 transactions across all datasets

---

## 🔬 Analytical Methodology

### 1. Data Preparation & Cleaning
- Filtered invalid entries (missing Customer IDs, negative values)
- Standardized variable names and data types
- Created derived variables for analysis
- Handled missing values and data quality issues

### 2. Exploratory Data Analysis (EDA)
**Participation Trends:**
- Tracked athlete participation growth from 111 athletes (1896) to 4000+ (modern Games)
- Visualized steady expansion of the Olympic movement globally

**Medal Distribution:**
- Identified top 10 medal-winning countries (all-time)
- Analyzed medal concentration across 12 major sports
- Examined gender distribution in medal events (Men, Women, Mixed, Open categories)

**Host Nation Effect:**
- Analyzed home advantage by comparing host nation performance
- Documented medal count peaks during hosting years

### 3. Statistical Modeling
**Linear Regression Model:**
```
Medal Count ~ Team Size + Host Status
```

**Model Performance:**
- **R² = 0.99** (explains 99% of variance in medal counts)
- **Coefficient for Team Size: 1.40** (highly significant, p < 0.001)
- Strong positive relationship: Larger delegations win more medals
- Model validated on 1,493 country-Games observations

---

## 📈 Key Findings

### Finding 1: Exponential Growth in Participation
Olympic participation has grown steadily from 111 athletes in 1896 to over 5,000 in recent Games, reflecting global expansion and increased inclusivity.

### Finding 2: Medal Concentration
**Top 5 All-Time Medal Winners:**
1. United States (US) - 3,094 medals
2. Germany (DE) - 1,433 medals  
3. Great Britain (GB) - 1,045 medals
4. France (FR) - 952 medals
5. China (CN) - 807 medals

These nations account for a disproportionate share of Olympic success, reflecting sustained investment in sports infrastructure.

### Finding 3: Sport-Specific Dominance
**Top Sports by Medal Count:**
- Athletics: 3,080 medals
- Swimming: 1,763 medals
- Wrestling: 1,356 medals

Traditional Olympic sports continue to dominate medal tallies.

### Finding 4: Home Advantage Confirmed
Host nations experience medal count peaks during their hosting year, demonstrating measurable home advantage effects.

### Finding 5: Team Size as Primary Predictor
**Statistical Model Results:**
- Every additional athlete increases expected medal count by 1.40 medals
- Team size is the strongest predictor of national success
- Host status provides additional (though smaller) boost

### Finding 6: Growing Gender Balance
Medal events show increasing gender equity over time, with Women's and Mixed events growing as percentage of total medals awarded.

---

## 🛠️ Technologies & Tools

**Programming Language:** R

**Key Libraries:**
- `tidyverse` - Data manipulation and transformation
- `ggplot2` - Data visualization
- `dplyr` - Data wrangling
- `readr` - Data import

**Analysis Techniques:**
- Linear regression modeling
- Exploratory data analysis (EDA)
- Data cleaning and transformation
- Statistical visualization
- Trend analysis

**Documentation:** Quarto (reproducible research)

---

## 📊 Visualizations

The analysis includes professional visualizations:

1. **Participation Growth Chart** - Line plot showing athlete growth over time
2. **Top Medal Winners** - Horizontal bar chart of top 10 NOCs
3. **Sport Distribution** - Bar chart of medals by sport
4. **Host Nation Effect** - Time series showing host performance spikes
5. **Gender Distribution** - Stacked bar chart of medals by event gender
6. **Team Size vs Medals** - Scatter plot with regression line

All visualizations created using `ggplot2` with professional styling.

---

## 📁 Project Files

- **[Full Analysis Report (PDF)](./Olympics_Analysis_26409852.pdf)** - Complete findings and visualizations
- **[R Code (Quarto)](./Olympics_Analysis_26409852.qmd)** - Reproducible analysis code (if available)


---

## 💡 Insights & Recommendations

### For National Olympic Committees:
1. **Increase Delegation Size:** Strong correlation between team size and medals suggests strategic value in sending larger teams
2. **Leverage Home Advantage:** Host nations should maximize infrastructure and preparation for hosting years
3. **Target High-Medal Sports:** Focus resources on Athletics, Swimming, and other medal-rich sports

### For Further Research:
1. Incorporate economic factors (GDP, sports funding) for richer causal analysis
2. Analyze sport-specific factors and athlete demographics
3. Examine seasonal differences (Summer vs Winter Olympics)
4. Study longitudinal athlete career trajectories

---

## 🔍 Limitations

1. **Omitted Variables:** Model doesn't include GDP, funding, or sports policy factors
2. **Incomplete Data:** Athlete-to-NOC mapping incomplete in provided dataset
3. **Temporal Changes:** Olympic event structure has changed over time, affecting comparisons
4. **Causality:** Statistical associations don't necessarily imply causation

---

## 🎓 Skills Demonstrated

- **Statistical Modeling:** Linear regression, hypothesis testing, model validation
- **Data Wrangling:** Cleaning, transformation, merging multiple datasets
- **Data Visualization:** Professional publication-quality plots
- **Reproducible Research:** Quarto/RMarkdown documentation
- **Critical Thinking:** Identifying limitations and suggesting improvements
- **Communication:** Translating complex analyses into actionable insights

---

## 📖 Methodology References

Analysis approach based on best practices from:
- Wickham, H., Çetinkaya-Rundel, M., & Grolemund, G. (2023). *R for Data Science*
- Salganik, M. J. (2018). *Bit by Bit: Social Research in the Digital Age*

---

## 👤 Author

**Sinethemba Ngcongo** (26409852) 
Stellenbosch University

---

## 📧 Contact

For questions about this analysis or collaboration opportunities:
- Email: ngcongosnethemba@gmail.com
  
- [LinkedIn:](www.linkedin.com/in/sinethemba-ngcongo)

---

## 📝 Project Context

This analysis was completed as part of the SI 348 individual assignment, demonstrating proficiency in:
- Computational social science methods
- R programming for data analysis
- Statistical modeling and inference
- Data visualization and communication
- Reproducible research practices
