// ===================================================================
// PASSAGES — Early 20th Century History
// Add new passages here. Each needs: era, title, text, footnote.
// ===================================================================

const passages = [
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Wright Brothers at Kitty Hawk",
        text: "On December 17, 1903, Orville Wright climbed aboard a fragile craft of wood, wire, and muslin on the windswept dunes of Kitty Hawk, North Carolina. The first flight lasted just 12 seconds and covered 120 feet. By the end of that day, Wilbur had flown 852 feet in 59 seconds. The age of powered flight had begun.",
        footnote: "The Wright Flyer cost less than $1,000 to build. Meanwhile, the U.S. government had spent $50,000 funding Samuel Langley's failed Aerodrome project. Sometimes the garage inventors win."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Triangle Shirtwaist Fire",
        text: "On March 25, 1911, a fire broke out on the 8th floor of the Triangle Shirtwaist Factory in New York City. The doors had been locked to prevent workers from taking breaks. 146 garment workers, mostly young immigrant women, perished that day. The tragedy led to sweeping reforms in workplace safety laws across the nation.",
        footnote: "Many victims were as young as 14. The factory owners were acquitted of manslaughter charges but later lost a civil suit, paying $75 per deceased victim. The fire galvanized the American labor movement and led directly to the creation of the Factory Investigating Commission."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Christmas Truce of 1914",
        text: "On Christmas Eve, 1914, along the Western Front, something remarkable happened. German soldiers began placing candles on trees and singing carols. British troops responded in kind. By Christmas morning, soldiers from both sides crossed into no man's land to exchange gifts, share food, and even play football. The war would rage for 4 more years.",
        footnote: "The truce was not universal but occurred at multiple points along the front. High command on both sides was furious. Troops were rotated to prevent fraternization from happening again. In some sectors, the informal peace lasted until New Year's Day, 1915."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Influenza Pandemic of 1918",
        text: "In the spring of 1918, a deadly strain of influenza began spreading across the globe. It struck with terrifying speed: a person could feel fine at breakfast and be dead by evening. Over 2 years, the pandemic killed an estimated 50 million people worldwide. More American soldiers died of influenza than were killed in combat during the Great War.",
        footnote: "The pandemic was misleadingly called the 'Spanish Flu' because wartime censorship suppressed news of the outbreak in combatant nations. Spain, being neutral, reported freely on the disease, creating the false impression that it originated there. Its true origin remains debated."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Birth of Commercial Radio",
        text: "On November 2, 1920, station KDKA in Pittsburgh broadcast the results of the Harding-Cox presidential election, marking the dawn of commercial radio in America. Within 3 years, there were over 500 licensed stations. Families gathered around their radio sets each evening, and for the first time in history, millions of people could hear the same voice at the same moment.",
        footnote: "Radio transformed American culture almost overnight. By 1930, 40 percent of American households owned a radio. It created the first shared mass media experience and also made national advertising possible for the first time."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Harlem Renaissance",
        text: "Throughout the 1920s, the neighborhood of Harlem in New York City became the center of an extraordinary flowering of African American art, literature, and music. Writers like Langston Hughes and Zora Neale Hurston gave voice to the Black experience. Jazz musicians like Duke Ellington and Louis Armstrong created sounds that would reshape music forever.",
        footnote: "The Harlem Renaissance was fueled in part by the Great Migration, which saw over 6 million African Americans move from the rural South to cities in the North and West between 1910 and 1970. Harlem's population doubled during the 1920s, creating a concentrated community of extraordinary creative energy."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Black Tuesday and Its Aftermath",
        text: "On October 29, 1929, the stock market crashed with a violence that stunned the nation. Over $14 billion in value vanished in a single day. Banks failed by the thousands. By 1933, unemployment had reached 25 percent. Bread lines stretched around city blocks, and families who had been comfortable just years before found themselves homeless and hungry.",
        footnote: "The Dow Jones Industrial Average did not return to its pre-crash peak until November 1954, a full 25 years later. The psychological impact was equally lasting: an entire generation developed a deep distrust of banks and the stock market that they carried for the rest of their lives."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "D-Day: The Invasion of Normandy",
        text: "In the early hours of June 6, 1944, over 156,000 Allied troops crossed the English Channel in the largest amphibious invasion in history. They landed on 5 beaches along the coast of Normandy, France, under withering enemy fire. By nightfall, the Allies had established a foothold in Europe. The liberation of the continent had begun. The cost was staggering: over 10,000 Allied casualties on that single day.",
        footnote: "The invasion was originally scheduled for June 5 but was delayed by 24 hours due to bad weather. Eisenhower carried a handwritten note in his pocket accepting full blame in case the invasion failed. He never had to use it, but the note survived and is now one of the most moving documents of the war."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Century in Statistics",
        text: "In 1900, the U.S. population was 76,212,168. By 1945, it had reached 139,928,165. Life expectancy rose from 47.3 years to 65.9 years. In 1900, only 6.4% of Americans had graduated high school. A loaf of bread cost $0.05, a gallon of milk $0.27, and the average annual wage was $438.00. By 1945, bread cost $0.09, milk was $0.63, and average wages had risen to $2,595.00.",
        footnote: "The most dramatic shift was urbanization. In 1900, 60% of Americans lived in rural areas. By 1940, that had flipped: more than 56% lived in cities. The automobile, electrification, and industrialization had fundamentally reshaped where and how Americans lived in just 40 years."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Cost of Two World Wars",
        text: "World War I lasted 1,566 days. The U.S. spent $33,625,000,000 on the conflict. American casualties totaled 320,518: 116,516 killed and 204,002 wounded. World War II lasted 2,194 days. U.S. expenditures reached $341,000,000,000. American casualties were far greater: 1,076,245 total, with 405,399 killed and 670,846 wounded. Combined, the two wars cost $374,625,000,000.",
        footnote: "These figures only capture American costs. Global military deaths in World War I reached approximately 9,700,000. In World War II, the toll was staggering: an estimated 70,000,000 to 85,000,000 people died, making it the deadliest conflict in human history."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Dates That Changed Everything",
        text: "April 18, 1906: the San Francisco earthquake. April 15, 1912: the Titanic sinks. June 28, 1914: Archduke Franz Ferdinand assassinated. November 11, 1918: the Armistice. January 16, 1920: Prohibition begins. October 29, 1929: Black Tuesday. March 4, 1933: FDR inaugurated. September 1, 1939: Germany invades Poland. December 7, 1941: Pearl Harbor. June 6, 1944: D-Day. August 6, 1945: Hiroshima.",
        footnote: "Of all these dates, December 7, 1941 may have had the most immediate impact on American life. Within 24 hours of the Pearl Harbor attack, Congress declared war with only 1 dissenting vote. Over 16,000,000 Americans would eventually serve in the armed forces."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Immigration by the Numbers",
        text: "Between 1900 and 1915, over 15,000,000 immigrants arrived in the United States. In the peak year of 1907, 1,285,349 people passed through Ellis Island alone. They came from Italy (3,156,000), Russia (2,519,000), Austria-Hungary (2,145,000), and dozens of other nations. The Immigration Act of 1924 slashed quotas to 164,667 per year, reducing the flow by roughly 80%.",
        footnote: "Ellis Island processed approximately 12,000,000 immigrants between 1892 and 1954. Inspectors had just 6 seconds to make an initial assessment of each person. Despite the massive numbers, only about 2% of arrivals were denied entry. The island is now a museum visited by over 4,000,000 people annually."
    }
];
