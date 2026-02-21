// ===================================================================
// PASSAGES — Early 20th Century History (1900–1945)
// 120 passages organized by era, with varied lengths and challenges.
// Add new passages here. Each needs: era, title, text, footnote.
// ===================================================================

const passages = [

    // =================================================================
    // THE NEW CENTURY · 1900–1913
    // =================================================================

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
        footnote: "Many victims were as young as 14. The factory owners were acquitted of manslaughter charges but later lost a civil suit, paying $75 per deceased victim. The fire galvanized the American labor movement."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Galveston Hurricane",
        text: "On September 8, 1900, a massive hurricane struck Galveston, Texas, killing between 6,000 and 12,000 people. It remains the deadliest natural disaster in American history. The storm surge reached 15 feet, and entire neighborhoods were swept out to sea. Galveston, once considered the most important city in Texas, never fully recovered.",
        footnote: "After the disaster, Galveston built a 17-foot seawall and raised the grade of the entire city by as much as 11 feet. The engineering project took seven years and is still studied as a model of urban resilience."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Theodore Roosevelt and the Square Deal",
        text: "When an assassin's bullet made Theodore Roosevelt president in September 1901, he was just 42 years old \u2014 the youngest president in American history. He promised every citizen a \"Square Deal\" and took on the powerful monopolies. He busted 44 trusts, created the National Parks system, and forever changed the relationship between government and big business.",
        footnote: "Roosevelt once gave an 84-minute speech immediately after being shot in the chest. The bullet was slowed by a folded manuscript and a metal eyeglass case in his pocket. He told the crowd: 'Ladies and gentlemen, I don't know whether you fully understand that I have just been shot; but it takes more than that to kill a Bull Moose.'"
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The San Francisco Earthquake",
        text: "At 5:12 a.m. on April 18, 1906, a devastating earthquake struck San Francisco. The shaking lasted less than a minute, but the fires that followed burned for three days. Over 3,000 people died, 80% of the city was destroyed, and 250,000 residents were left homeless. The disaster reshaped the city entirely.",
        footnote: "The earthquake ruptured the San Andreas Fault along a 296-mile stretch. The fires caused more damage than the quake itself because broken water mains left firefighters helpless. The rebuilding took a decade."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Ford's Assembly Line",
        text: "In 1913, Henry Ford installed the first moving assembly line at his Highland Park plant in Michigan. Before the assembly line, building a Model T took over 12 hours. After? Just 93 minutes. Ford passed the savings to buyers: the price dropped from $850 in 1908 to $260 by 1925. The automobile was no longer a luxury for the rich.",
        footnote: "Ford also doubled his workers' wages to $5 per day in 1914, reasoning that his employees should be able to afford the cars they built. Critics called it madness. Worker turnover dropped by 90% almost overnight."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Sinking of the Titanic",
        text: "At 11:40 p.m. on April 14, 1912, the RMS Titanic struck an iceberg in the North Atlantic. The ship, proclaimed \"unsinkable,\" went down in just 2 hours and 40 minutes. Of the 2,224 people aboard, more than 1,500 died in the freezing waters. There were lifeboats for only 1,178.",
        footnote: "First-class passengers had a 62% survival rate. Third-class passengers had just 25%. Many third-class passengers were locked below decks as the ship sank. The disaster led directly to new maritime safety regulations requiring sufficient lifeboats for all passengers."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Panama Canal",
        text: "The Panama Canal, completed in 1914, was one of the greatest engineering feats in history. The project took 10 years, employed over 75,000 workers, and cost $375,000,000. More than 5,600 workers died during construction, mostly from disease. The canal cut the sea journey from New York to San Francisco from 12,600 miles to just 4,900.",
        footnote: "The French had attempted the canal first, beginning in 1881. Their effort collapsed after 22,000 workers died from malaria and yellow fever. The American project succeeded in part because of Dr. William Gorgas, who dramatically reduced disease by eliminating mosquito breeding grounds."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "The Boxer Rebellion",
        text: "In 1900, a Chinese secret society known as the Boxers launched a violent campaign against foreign influence. They besieged the international legations in Beijing for 55 days. An eight-nation alliance \u2014 including the United States, Britain, Japan, and Russia \u2014 sent 20,000 troops to lift the siege. China was forced to pay $333,000,000 in reparations.",
        footnote: "The United States used its share of the reparations to fund scholarships for Chinese students to study in America. This program, begun in 1909, educated thousands of students who became influential leaders in modern China."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Upton Sinclair and The Jungle",
        text: "In 1906, Upton Sinclair published \"The Jungle,\" a novel exposing the horrifying conditions in Chicago's meatpacking industry. He described rotten meat, rat droppings mixed with sausage, and workers falling into rendering tanks. The public outcry was immediate. Within months, Congress passed the Pure Food and Drug Act and the Meat Inspection Act.",
        footnote: "Sinclair had intended the novel as a socialist critique of capitalism. He famously said: 'I aimed at the public's heart, and by accident I hit it in the stomach.' The book's legacy was food safety reform, not the labor revolution he had envisioned."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Peary at the North Pole",
        text: "On April 6, 1909, Robert Peary claimed to have reached the North Pole. He was accompanied by Matthew Henson and four Inuit men: Ootah, Egingwah, Seegloo, and Ooqueah. The journey had taken 37 days across the Arctic ice.",
        footnote: "The claim has been disputed for over a century. Peary's navigational records contain inconsistencies, and some historians believe he may have fallen short by 30 to 60 miles. What is not disputed is that Henson, an African American, was essential to the expedition's survival."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Madame Curie's Nobel Prizes",
        text: "In 1903, Marie Curie became the first woman to win a Nobel Prize, sharing the physics award with her husband Pierre and Henri Becquerel for their work on radioactivity. In 1911, she won a second Nobel \u2014 this time in chemistry \u2014 for discovering the elements polonium and radium. She remains the only person to win Nobel Prizes in two different sciences.",
        footnote: "Curie carried test tubes of radioactive isotopes in her pockets and stored them in her desk drawer. Her personal effects, including her cookbook, are still so radioactive that they must be kept in lead-lined boxes. Researchers who wish to view them must wear protective clothing and sign a liability waiver."
    },
    {
        era: "The New Century \u00b7 1900\u20131913",
        title: "Ellis Island: Gateway to America",
        text: "Between 1892 and 1924, approximately 12,000,000 immigrants entered the United States through Ellis Island. On its busiest day \u2014 April 17, 1907 \u2014 11,747 people were processed. Inspectors had roughly 6 seconds to assess each person. Names were checked against ship manifests; the myth that names were changed at Ellis Island is largely untrue.",
        footnote: "About 2% of arrivals were denied entry, usually for contagious disease or the likelihood of becoming a public charge. For the 98% who passed, the inspection took 3 to 5 hours. They then took a ferry to Manhattan, often with less than $25 in their pockets."
    },

    // =================================================================
    // THE GREAT WAR · 1914–1918
    // =================================================================

    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Christmas Truce of 1914",
        text: "On Christmas Eve, 1914, along the Western Front, something remarkable happened. German soldiers began placing candles on trees and singing carols. British troops responded in kind. By Christmas morning, soldiers from both sides crossed into no man's land to exchange gifts, share food, and even play football. The war would rage for 4 more years.",
        footnote: "The truce was not universal but occurred at multiple points along the front. High command on both sides was furious. Troops were rotated to prevent fraternization from happening again."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Influenza Pandemic of 1918",
        text: "In the spring of 1918, a deadly strain of influenza began spreading across the globe. It struck with terrifying speed: a person could feel fine at breakfast and be dead by evening. Over 2 years, the pandemic killed an estimated 50 million people worldwide. More American soldiers died of influenza than were killed in combat during the Great War.",
        footnote: "The pandemic was misleadingly called the 'Spanish Flu' because wartime censorship suppressed news of the outbreak in combatant nations. Spain, being neutral, reported freely on the disease."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Assassination of Archduke Franz Ferdinand",
        text: "On June 28, 1914, Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo by a 19-year-old Serbian nationalist named Gavrilo Princip. The archduke's driver had taken a wrong turn, stopping the car just feet from where Princip stood. Within six weeks, the major powers of Europe were at war.",
        footnote: "The chain of events that followed was breathtaking in its speed. Austria-Hungary declared war on Serbia on July 28. Russia mobilized on July 30. Germany declared war on Russia on August 1 and on France on August 3. Britain entered on August 4. In barely a month, a single murder had engulfed a continent."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "Trench Warfare",
        text: "By late 1914, the Western Front had become a network of trenches stretching 440 miles from the English Channel to Switzerland. Soldiers lived in mud, surrounded by rats, lice, and the stench of death. Going \"over the top\" into no man's land often meant charging directly into machine gun fire. In the Battle of the Somme alone, 57,470 British soldiers fell on the first day.",
        footnote: "Trench foot, caused by prolonged exposure to wet and cold conditions, affected thousands. Soldiers were required to inspect each other's feet daily. In severe cases, amputation was the only treatment."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Sinking of the Lusitania",
        text: "On May 7, 1915, a German U-boat torpedoed the British ocean liner RMS Lusitania off the coast of Ireland. The ship sank in just 18 minutes, killing 1,198 of the 1,959 people on board. Among the dead were 128 Americans. The sinking outraged the American public and helped shift opinion toward entering the war.",
        footnote: "Germany had taken out advertisements in American newspapers warning passengers not to sail on the Lusitania. Most dismissed the warnings as bluster. The sinking did not immediately bring America into the war, but it planted the seeds of public anger that would culminate two years later."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "Poison Gas on the Western Front",
        text: "On April 22, 1915, German forces released 168 tons of chlorine gas near Ypres, Belgium. A greenish-yellow cloud drifted across no man's land toward the Allied trenches. Soldiers choked, vomited, and collapsed. By war's end, both sides had used gas extensively: chlorine, phosgene, and mustard gas together caused over 1,000,000 casualties.",
        footnote: "Gas masks became standard equipment, but they were crude and often failed. Mustard gas was particularly feared because it caused blistering of the skin, blindness, and lingering lung damage. Many survivors suffered for decades. The horror of chemical warfare led to the Geneva Protocol of 1925."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Battle of Verdun",
        text: "The Battle of Verdun began on February 21, 1916, and lasted 303 days. Germany intended to \"bleed France white\" by attacking a position the French could not afford to lose. The strategy succeeded in producing carnage: combined casualties exceeded 700,000. France held Verdun, but at a cost that scarred the nation for a generation.",
        footnote: "The landscape around Verdun was so devastated that parts of it remain uninhabitable today. An area called the Zone Rouge is still off-limits due to unexploded ordnance, human remains, and soil poisoned by lead, mercury, and arsenic."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "America Enters the War",
        text: "On April 2, 1917, President Woodrow Wilson asked Congress to declare war on Germany. \"The world must be made safe for democracy,\" he said. The vote passed 82\u20136 in the Senate and 373\u201350 in the House. Within 18 months, 2,000,000 American soldiers had crossed the Atlantic. Their arrival tipped the balance decisively toward the Allies.",
        footnote: "Wilson had won reelection in 1916 partly on the slogan 'He kept us out of war.' The shift was driven by unrestricted German submarine warfare and the Zimmermann Telegram, in which Germany secretly proposed a military alliance with Mexico against the United States."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Armistice",
        text: "At 11:00 a.m. on November 11, 1918, the guns fell silent. The Armistice ending the Great War took effect at the 11th hour of the 11th day of the 11th month. Soldiers on both sides emerged from their trenches in disbelief. The war had killed approximately 9,000,000 soldiers and 7,000,000 civilians. It had lasted 1,566 days.",
        footnote: "Fighting continued until the very last minute. An American soldier named Henry Gunther was killed at 10:59 a.m., one minute before the ceasefire. He is generally recognized as the last soldier killed in the war."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "The Treaty of Versailles",
        text: "The Treaty of Versailles, signed on June 28, 1919, imposed harsh terms on Germany. The nation lost 13% of its territory and 10% of its population. The military was limited to 100,000 troops. Germany was required to accept sole responsibility for the war and pay $33,000,000,000 in reparations \u2014 a sum so vast it was not fully paid until October 2010.",
        footnote: "Many historians consider the Treaty of Versailles a primary cause of World War II. The reparations crippled the German economy, fueling resentment and extremism. John Maynard Keynes warned in 1919 that the treaty would lead to another war. He was right."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "Alvin York: Reluctant Hero",
        text: "On October 8, 1918, Corporal Alvin York of Tennessee led a small patrol that captured 132 German soldiers in the Argonne Forest. York, a devout Christian, had initially sought conscientious objector status. His commanding officer convinced him to serve. He killed 25 German soldiers with his rifle and pistol, silencing 35 machine guns.",
        footnote: "York returned home to a hero's welcome but remained humble. He used his fame to raise money for a school in his impoverished Tennessee community. He refused to endorse products or profit from his war record for over two decades."
    },
    {
        era: "The Great War \u00b7 1914\u20131918",
        title: "Women in the War Effort",
        text: "With millions of men at the front, women filled their places in factories, offices, and farms. In Britain, the number of women in employment rose from 3,224,600 to 4,814,600 during the war. They built munitions, drove ambulances, served as nurses near the front lines, and operated telephone switchboards for the military. The old arguments against women's suffrage crumbled under the weight of their contributions.",
        footnote: "The 19th Amendment, granting American women the right to vote, was ratified on August 18, 1920. In Britain, women over 30 gained the vote in 1918, with full equal suffrage following in 1928. The war did not cause these changes alone, but it made opposition to them untenable."
    },

    // =================================================================
    // THE ROARING TWENTIES · 1919–1929
    // =================================================================

    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Birth of Commercial Radio",
        text: "On November 2, 1920, station KDKA in Pittsburgh broadcast the results of the Harding-Cox presidential election, marking the dawn of commercial radio in America. Within 3 years, there were over 500 licensed stations. Families gathered around their radio sets each evening, and for the first time in history, millions of people could hear the same voice at the same moment.",
        footnote: "Radio transformed American culture almost overnight. By 1930, 40 percent of American households owned a radio. It created the first shared mass media experience."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Harlem Renaissance",
        text: "Throughout the 1920s, the neighborhood of Harlem in New York City became the center of an extraordinary flowering of African American art, literature, and music. Writers like Langston Hughes and Zora Neale Hurston gave voice to the Black experience. Jazz musicians like Duke Ellington and Louis Armstrong created sounds that would reshape music forever.",
        footnote: "The Harlem Renaissance was fueled in part by the Great Migration, which saw over 6 million African Americans move from the rural South to cities in the North and West between 1910 and 1970."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "Prohibition Begins",
        text: "On January 17, 1920, the 18th Amendment took effect, banning the manufacture, sale, and transportation of alcoholic beverages in the United States. Supporters called it the \"noble experiment.\" Within months, an underground economy of speakeasies, bootleggers, and rumrunners had sprung up. Organized crime flourished. Al Capone's empire in Chicago earned an estimated $60,000,000 per year.",
        footnote: "Prohibition lasted 13 years before being repealed by the 21st Amendment on December 5, 1933. It remains the only constitutional amendment to have been entirely repealed by another. Many historians consider it one of the greatest policy failures in American history."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "Lindbergh Crosses the Atlantic",
        text: "On May 20, 1927, a 25-year-old airmail pilot named Charles Lindbergh took off from Roosevelt Field on Long Island in a single-engine monoplane called the Spirit of St. Louis. He landed at Le Bourget Field near Paris 33 hours and 30 minutes later, having flown 3,610 miles nonstop and alone. A crowd of 150,000 rushed the runway to greet him.",
        footnote: "Lindbergh carried five sandwiches, a canteen of water, and 451 gallons of fuel. He had no radio and no parachute to save weight. To stay awake, he flew with the windows open and occasionally held his eyelids apart with his fingers."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Jazz Age",
        text: "Jazz \u2014 born in the African American communities of New Orleans \u2014 swept the nation in the 1920s. Louis Armstrong's trumpet solos redefined what music could be. Duke Ellington held court at Harlem's Cotton Club. Bessie Smith sang the blues with a power that shook auditoriums. F. Scott Fitzgerald called it the Jazz Age, and the name stuck.",
        footnote: "Many white Americans were scandalized by jazz. Critics called it 'primitive' and 'immoral.' Some cities attempted to ban jazz performances. But the music was unstoppable. It would eventually be recognized as one of America's greatest cultural contributions to the world."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Scopes Monkey Trial",
        text: "In July 1925, a Tennessee schoolteacher named John T. Scopes was put on trial for teaching evolution. The case became a national spectacle. William Jennings Bryan argued for the prosecution; Clarence Darrow led the defense. Scopes was found guilty and fined $100. The trial, broadcast live on radio, exposed the growing rift between science and religious fundamentalism in America.",
        footnote: "Bryan died just five days after the trial ended. Darrow had subjected him to a withering cross-examination about the literal truth of the Bible. The trial inspired the play and film 'Inherit the Wind,' though both took considerable dramatic liberties with the actual events."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "Women Win the Vote",
        text: "On August 18, 1920, the 19th Amendment was ratified, guaranteeing women the right to vote. The final battle came down to Tennessee, where the state legislature voted 49\u201347 in favor. The deciding vote was cast by 24-year-old Harry T. Burn, who had received a letter from his mother that morning: \"Don't forget to be a good boy and help Mrs. Catt put the 'rat' in ratification.\"",
        footnote: "The women's suffrage movement had begun at the Seneca Falls Convention in 1848 \u2014 72 years before the amendment's passage. Many of the women who launched the movement did not live to see it succeed."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Discovery of King Tut's Tomb",
        text: "On November 4, 1922, a water boy in Howard Carter's archaeological expedition stumbled upon a stone step in Egypt's Valley of the Kings. It led to the virtually intact tomb of Pharaoh Tutankhamun. When Carter peered through a small hole in the sealed doorway, his sponsor Lord Carnarvon asked: \"Can you see anything?\" Carter replied: \"Yes, wonderful things.\"",
        footnote: "The tomb contained over 5,000 artifacts, including the famous gold death mask weighing 24 pounds. Lord Carnarvon died from an infected mosquito bite just weeks after the opening, sparking worldwide rumors of a 'mummy's curse.' Carter himself lived another 17 years."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "Babe Ruth and the Home Run",
        text: "In 1920, Babe Ruth hit 54 home runs for the New York Yankees. No other entire team in the American League hit that many. In 1927, he hit 60 \u2014 a record that stood for 34 years. Ruth transformed baseball from a game of strategy and speed into one of raw power. He earned $80,000 per year at his peak, more than the President of the United States.",
        footnote: "When a reporter pointed out that Ruth earned more than President Hoover, Ruth reportedly replied: 'I know, but I had a better year than Hoover did.' Whether he actually said it is debated, but it captures his personality perfectly."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Tulsa Race Massacre",
        text: "On May 31, 1921, a white mob attacked the Greenwood District of Tulsa, Oklahoma \u2014 a prosperous Black community known as \"Black Wall Street.\" Over the next 18 hours, as many as 300 people were killed. More than 1,256 homes were burned. Some 10,000 Black residents were left homeless. The attack was erased from official histories for decades.",
        footnote: "Private planes were used to drop incendiary devices on Greenwood, making it one of the first aerial assaults on American soil. No one was ever convicted. The massacre was not included in Oklahoma state history curricula until 2002."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Rise of the Automobile",
        text: "In 1900, there were about 8,000 automobiles in the United States. By 1929, there were 23,000,000. The car reshaped everything: suburbs grew, rural isolation shrank, and the modern American landscape of highways, gas stations, motels, and drive-in restaurants began to take shape. In 1925, 1 out of every 6 American workers owed their job to the automobile industry.",
        footnote: "The automobile also transformed courtship. For the first time, young couples could escape the watchful eyes of their parents. Social critics warned that the car was destroying morality. They may have had a point \u2014 a 1920s survey found that most young women who had premarital relations cited the automobile as a contributing factor."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "Sacco and Vanzetti",
        text: "In 1920, two Italian-born anarchists \u2014 Nicola Sacco and Bartolomeo Vanzetti \u2014 were arrested for robbery and murder in Massachusetts. Their trial became a global cause. Critics argued they were convicted not for the crime but for their political beliefs and immigrant status. After seven years of appeals, both men were executed on August 23, 1927. The case divided America.",
        footnote: "In 1977, Massachusetts Governor Michael Dukakis issued a proclamation declaring that Sacco and Vanzetti had been unfairly tried and that any disgrace should be removed from their names. He did not declare them innocent, only that the process had been flawed."
    },
    {
        era: "The Roaring Twenties \u00b7 1919\u20131929",
        title: "The Great Mississippi Flood of 1927",
        text: "In the spring of 1927, the Mississippi River broke through levees in 145 places, flooding 27,000 square miles across seven states. The flood displaced 640,000 people, destroyed 137,000 homes, and killed an estimated 500. It was the most destructive river flood in American history. The disaster exposed deep racial inequities: Black residents were forced into relief camps at gunpoint and made to work without pay.",
        footnote: "The flood changed American politics. Herbert Hoover managed the relief effort and rode the publicity to the presidency in 1928. The flood also accelerated the Great Migration, as tens of thousands of displaced Black Southerners moved north to cities like Chicago and Detroit."
    },

    // =================================================================
    // THE GREAT DEPRESSION · 1929–1939
    // =================================================================

    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Black Tuesday and Its Aftermath",
        text: "On October 29, 1929, the stock market crashed with a violence that stunned the nation. Over $14 billion in value vanished in a single day. Banks failed by the thousands. By 1933, unemployment had reached 25 percent. Bread lines stretched around city blocks, and families who had been comfortable just years before found themselves homeless and hungry.",
        footnote: "The Dow Jones Industrial Average did not return to its pre-crash peak until November 1954, a full 25 years later. An entire generation developed a deep distrust of banks and the stock market that they carried for the rest of their lives."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The Dust Bowl",
        text: "In the 1930s, severe drought and decades of poor farming practices turned the Great Plains into a wasteland. Massive dust storms \u2014 some rising 10,000 feet into the air \u2014 buried homes, killed livestock, and choked the life from the land. On April 14, 1935, known as \"Black Sunday,\" a single storm stripped 300,000 tons of topsoil from the prairie and carried it all the way to Washington, D.C.",
        footnote: "An estimated 2,500,000 people fled the Dust Bowl region during the 1930s. Many headed to California, where they were often met with hostility and called 'Okies' regardless of their state of origin. John Steinbeck's 'The Grapes of Wrath' immortalized their suffering."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "FDR's First Hundred Days",
        text: "Franklin Roosevelt took the oath of office on March 4, 1933, and immediately launched an unprecedented burst of legislation. In his first 100 days, Congress passed 15 major bills. The Emergency Banking Act restored confidence in the banks. The Civilian Conservation Corps put 250,000 young men to work in national forests. The Agricultural Adjustment Act sought to stabilize farm prices. The pace was breathtaking.",
        footnote: "Roosevelt's inaugural address contained his most famous line: 'The only thing we have to fear is fear itself.' He delivered 30 'Fireside Chats' on radio during his presidency, speaking directly to Americans in their living rooms. It was a revolutionary use of mass media in politics."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The Civilian Conservation Corps",
        text: "The CCC, created in 1933, put 3,000,000 unemployed young men to work on conservation projects across America. They planted 3,000,000,000 trees, built 800 state parks, constructed 125,000 miles of roads, and erected 46,854 bridges. Workers earned $30 per month, of which $25 was sent home to their families. The program ran for 9 years until 1942.",
        footnote: "Many CCC projects are still in use today, including trails, shelters, and structures in national and state parks. The program is widely regarded as one of the most successful New Deal programs, but it excluded women and was racially segregated."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Social Security Is Born",
        text: "On August 14, 1935, President Roosevelt signed the Social Security Act into law. It created a system of old-age pensions, unemployment insurance, and aid to dependent children. The first monthly check \u2014 $22.54 \u2014 was issued to Ida May Fuller of Ludlow, Vermont, in January 1940. She had paid a total of $24.75 into the system. She lived to 100 and collected $22,888.92.",
        footnote: "The Act was controversial. Critics on the right called it socialism. Critics on the left said it did not go far enough. It originally excluded domestic workers and farmworkers \u2014 categories that disproportionately included Black Americans. Despite its flaws, Social Security became the most successful anti-poverty program in American history."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The Bonus Army March",
        text: "In the summer of 1932, approximately 43,000 World War I veterans and their families marched on Washington, D.C. They demanded early payment of bonus certificates not due until 1945. They built a shantytown along the Anacostia River and refused to leave. President Hoover ordered the Army to clear them out. Troops led by General Douglas MacArthur used tanks, tear gas, and bayonets against the veterans.",
        footnote: "The images of soldiers attacking veterans and their families shocked the nation and contributed to Hoover's landslide defeat by Roosevelt in November 1932. The bonus was eventually paid in 1936."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Hoover Dam",
        text: "Construction of Hoover Dam began in 1931 and was completed in 1936, two years ahead of schedule. The dam stands 726 feet tall and required 3,250,000 cubic yards of concrete \u2014 enough to pave a two-lane highway from San Francisco to New York. It employed 21,000 workers during the Depression, and 96 men died during construction. The dam created Lake Mead, the largest reservoir in the United States.",
        footnote: "Workers endured temperatures reaching 140 degrees in the diversion tunnels. The dam was originally called Boulder Dam. It was renamed Hoover Dam in 1947 after the former president who authorized the project. Today it generates enough electricity to serve 1,300,000 people."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The Hindenburg Disaster",
        text: "On May 6, 1937, the German airship Hindenburg caught fire while docking at Lakehurst, New Jersey. The 804-foot airship was consumed in just 34 seconds. Of the 97 people on board, 35 died, along with 1 member of the ground crew. Radio reporter Herbert Morrison's anguished cry \u2014 \"Oh, the humanity!\" \u2014 became one of the most famous phrases in broadcasting history.",
        footnote: "The disaster effectively ended the era of rigid airship travel, though the technology had been declining for years. The cause of the fire remains debated: theories include static electricity, a hydrogen leak, and sabotage."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Amelia Earhart Disappears",
        text: "On July 2, 1937, Amelia Earhart and navigator Fred Noonan vanished over the Pacific Ocean while attempting to fly around the world. They were last heard from near Howland Island, a tiny speck in the central Pacific just 1.5 miles long and half a mile wide. Despite a massive search covering 250,000 square miles, no trace of the plane was found. She was 39 years old.",
        footnote: "Earhart had set numerous aviation records, including being the first woman to fly solo across the Atlantic. Her disappearance has spawned countless theories, from crash-and-sink to capture by the Japanese. None has been conclusively proven."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The Golden Gate Bridge",
        text: "The Golden Gate Bridge opened on May 27, 1937. It had taken 4 years and $35,000,000 to build. At 4,200 feet, it was the longest suspension bridge in the world. On opening day, approximately 200,000 people walked across it. Chief engineer Joseph Strauss had insisted on safety nets during construction \u2014 they saved the lives of 19 men, who called themselves the \"Halfway to Hell Club.\"",
        footnote: "The bridge's distinctive orange color \u2014 officially called 'International Orange' \u2014 was originally intended as a primer coat. The consulting architect Irving Morrow liked the color so much against the fog and sky that he fought to keep it. The Navy had wanted it painted black and yellow."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Jesse Owens at the 1936 Olympics",
        text: "At the 1936 Berlin Olympics, Adolf Hitler intended to showcase Aryan superiority. Instead, Jesse Owens \u2014 a Black American from Alabama \u2014 won 4 gold medals in track and field. He won the 100 meters in 10.3 seconds, the 200 meters in 20.7 seconds, the long jump at 26 feet 5 inches, and anchored the 4x100 relay. He was the most successful athlete at the Games.",
        footnote: "Owens returned home to a ticker-tape parade in New York but was not invited to the White House. President Roosevelt never sent him a telegram of congratulations. Owens later said: 'Hitler didn't snub me; it was our president who snubbed me.'"
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "The War of the Worlds Broadcast",
        text: "On October 30, 1938, Orson Welles directed a radio adaptation of H.G. Wells' \"The War of the Worlds\" on CBS. The broadcast was formatted as a series of fake news bulletins reporting a Martian invasion of New Jersey. Listeners who tuned in late panicked: some fled their homes, others called the police, and newspapers reported mass hysteria across the country.",
        footnote: "The extent of the actual panic has been debated by historians. Newspapers may have exaggerated the hysteria to discredit radio as a news medium. Still, the broadcast demonstrated radio's extraordinary power to shape public perception \u2014 a lesson that was not lost on either politicians or propagandists."
    },
    {
        era: "The Great Depression \u00b7 1929\u20131939",
        title: "Dorothea Lange's Migrant Mother",
        text: "In March 1936, photographer Dorothea Lange stopped at a pea pickers' camp in Nipomo, California. She took six photographs of a 32-year-old woman named Florence Owens Thompson and her children. One of those images \u2014 \"Migrant Mother\" \u2014 became the defining photograph of the Great Depression and one of the most reproduced images in history.",
        footnote: "Thompson was a Cherokee woman from Oklahoma. She never received any compensation for the photograph and was reportedly bitter about it. She told a reporter in 1978: 'I wish she hadn't taken my picture. I can't get a penny out of it.'"
    },

    // =================================================================
    // THE WORLD AT WAR AGAIN · 1939–1945
    // =================================================================

    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "D-Day: The Invasion of Normandy",
        text: "In the early hours of June 6, 1944, over 156,000 Allied troops crossed the English Channel in the largest amphibious invasion in history. They landed on 5 beaches along the coast of Normandy, France, under withering enemy fire. By nightfall, the Allies had established a foothold in Europe. The cost was staggering: over 10,000 Allied casualties on that single day.",
        footnote: "Eisenhower carried a handwritten note in his pocket accepting full blame in case the invasion failed. He never had to use it, but the note survived and is now one of the most moving documents of the war."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Blitz",
        text: "From September 7, 1940, to May 11, 1941, Germany bombed Britain relentlessly. London was attacked 71 times. Other cities \u2014 Coventry, Birmingham, Liverpool, Plymouth \u2014 were devastated. Over 43,000 civilians were killed and more than 1,000,000 homes were damaged or destroyed. Winston Churchill told the House of Commons: \"We shall never surrender.\"",
        footnote: "During the Blitz, Londoners sheltered in Underground stations, which were not originally intended as bomb shelters. The government resisted opening them at first, but the public simply bought penny tickets and refused to leave. At the peak, 177,000 people slept in the Tube each night."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Pearl Harbor",
        text: "At 7:55 a.m. on December 7, 1941, Japanese aircraft attacked the U.S. naval base at Pearl Harbor, Hawaii. The assault lasted less than two hours. When it was over, 2,403 Americans were dead, 1,178 were wounded, and 21 ships had been sunk or damaged. The USS Arizona alone lost 1,177 crew members. The next day, Congress declared war with only one dissenting vote.",
        footnote: "The sole dissenting vote was cast by Representative Jeannette Rankin of Montana, a lifelong pacifist who had also voted against entering World War I. She said simply: 'As a woman, I can't go to war, and I refuse to send anyone else.'"
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Japanese American Internment",
        text: "On February 19, 1942, President Roosevelt signed Executive Order 9066, authorizing the forced relocation of 120,000 Japanese Americans from the West Coast to internment camps. Two-thirds of those interned were American citizens. Families were given just days to dispose of their homes, businesses, and possessions. Many lost everything they had built over a lifetime.",
        footnote: "In 1988, President Reagan signed the Civil Liberties Act, which formally apologized for the internment and provided $20,000 in reparations to each surviving internee. The legislation acknowledged that the internment was based on 'race prejudice, war hysteria, and a failure of political leadership.'"
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Manhattan Project",
        text: "In 1942, the U.S. government launched a secret program to develop an atomic bomb. Codenamed the Manhattan Project, it employed over 125,000 people at 30 sites across the country. The total cost was $2,000,000,000. At its peak, the project consumed more electricity than the entire city of Detroit. On July 16, 1945, the first atomic bomb was detonated at the Trinity test site in New Mexico.",
        footnote: "Project director J. Robert Oppenheimer later recalled that the explosion brought to mind a line from Hindu scripture: 'Now I am become Death, the destroyer of worlds.' Test director Kenneth Bainbridge was more direct: 'Now we are all sons of bitches.'"
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Stalingrad: The Turning Point",
        text: "The Battle of Stalingrad lasted from August 23, 1942, to February 2, 1943 \u2014 163 days of savage fighting. The city was reduced to rubble. Soldiers fought room to room, floor to floor. Temperatures dropped to -30 degrees. When the German 6th Army finally surrendered, only 91,000 of the original 300,000 soldiers remained alive. Fewer than 6,000 would ever return home.",
        footnote: "Total casualties on both sides exceeded 2,000,000, making Stalingrad the bloodiest battle in human history. The Soviet victory marked the turning point of the war in Europe. From that point forward, the German army was in retreat."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Navajo Code Talkers",
        text: "During World War II, the U.S. Marines recruited approximately 400 Navajo men to serve as code talkers in the Pacific theater. They developed an unbreakable code based on their native language. The Navajo language was ideal: it had no written form, an extremely complex grammar, and was understood by fewer than 30 non-Navajo people in the world.",
        footnote: "The code talkers served in every major Marine operation in the Pacific from 1942 to 1945. Their code was never broken by the Japanese. The program remained classified until 1968. The code talkers did not receive formal recognition from the U.S. government until 2001."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Battle of Midway",
        text: "On June 4, 1942, the U.S. Navy won a decisive victory at Midway Atoll, sinking 4 Japanese aircraft carriers in a single day. American codebreakers had deciphered Japanese communications, allowing Admiral Chester Nimitz to position his outnumbered fleet in ambush. The U.S. lost 1 carrier; Japan lost 4, along with 3,057 men and 248 aircraft. The balance of power in the Pacific shifted permanently.",
        footnote: "The victory at Midway came just six months after Pearl Harbor. It is widely considered one of the most important naval battles in history. Japan, which had been on the offensive since December 1941, was forced onto the defensive for the rest of the war."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Rosie the Riveter",
        text: "With 16,000,000 men serving in the military, American women entered the workforce in unprecedented numbers. By 1944, women made up 37% of the civilian workforce. They welded ships, assembled aircraft, operated heavy machinery, and drove taxis. The fictional character \"Rosie the Riveter\" became a cultural icon, symbolizing the strength and capability of working women.",
        footnote: "After the war, many women were pressured to leave their jobs and return to domestic roles. But the experience of wartime employment had permanently changed expectations. A generation of women had proven they could do any job, and many of their daughters would remember."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Liberation of Paris",
        text: "On August 25, 1944, Allied forces liberated Paris after four years of German occupation. French General Philippe Leclerc's 2nd Armored Division led the way, followed by the American 4th Infantry Division. Crowds filled the Champs-Elys\u00e9es, weeping, singing, and embracing the soldiers. Church bells rang across the city for the first time since 1940.",
        footnote: "Hitler had ordered the military governor of Paris to destroy the city rather than let it fall intact. General Dietrich von Choltitz disobeyed the order. When asked why, he reportedly said he could not bear to be remembered as the man who destroyed Paris."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Hiroshima",
        text: "At 8:15 a.m. on August 6, 1945, the B-29 bomber Enola Gay dropped an atomic bomb on Hiroshima, Japan. The explosion created a fireball with a surface temperature of 10,830 degrees Fahrenheit. Approximately 80,000 people died instantly. By the end of 1945, the death toll had reached 140,000. Three days later, a second bomb was dropped on Nagasaki, killing 70,000 more.",
        footnote: "Japan surrendered on August 15, 1945. The decision to use atomic weapons remains one of the most debated topics in history. Defenders argue it shortened the war and saved lives on both sides. Critics argue that Japan was already near defeat and that the bombings were unnecessary."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Holocaust",
        text: "Between 1941 and 1945, Nazi Germany systematically murdered 6,000,000 Jews in what became known as the Holocaust. The killing was carried out in death camps, gas chambers, mass shootings, and forced labor operations. An additional 5,000,000 Roma, disabled people, political prisoners, and others were also killed. It was genocide on an industrial scale.",
        footnote: "When Allied soldiers liberated the concentration camps in 1945, many were so horrified by what they found that commanders ordered local German civilians to tour the camps and witness the atrocities firsthand. General Eisenhower said he wanted as much evidence as possible because 'the day will come when some will say this never happened.'"
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Battle of the Bulge",
        text: "On December 16, 1944, Germany launched a massive surprise offensive through the Ardennes forest in Belgium. The attack created a 50-mile \"bulge\" in the Allied lines. Temperatures dropped to -20 degrees. The battle lasted 6 weeks and involved 610,000 American troops. U.S. casualties totaled 89,500, including 19,000 killed. It was the bloodiest single battle fought by the United States in the war.",
        footnote: "At the besieged town of Bastogne, when the Germans demanded surrender, American General Anthony McAuliffe famously replied with a single word: 'Nuts!' His defenders held out until Patton's Third Army broke through to relieve them on December 26."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "Iwo Jima",
        text: "The battle for Iwo Jima lasted 36 days, from February 19 to March 26, 1945. The tiny volcanic island \u2014 just 8 square miles \u2014 was defended by 21,000 Japanese soldiers in a network of tunnels and bunkers. Nearly all of them died. American casualties were 26,038, including 6,821 killed. The iconic photograph of Marines raising the flag on Mount Suribachi became a symbol of American sacrifice.",
        footnote: "Three of the six men in the famous flag-raising photograph were killed in action on Iwo Jima before the battle ended. The photograph was taken by Joe Rosenthal on February 23, 1945. It won the Pulitzer Prize and was later used as the model for the Marine Corps War Memorial in Arlington."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The GI Bill",
        text: "On June 22, 1944, President Roosevelt signed the Servicemen's Readjustment Act \u2014 commonly known as the GI Bill. It provided returning veterans with funds for college, low-cost mortgages, and unemployment benefits. By 1956, nearly 8,000,000 veterans had used the education benefit. The GI Bill created the modern American middle class, but its benefits were systematically denied to many Black veterans through discriminatory local administration.",
        footnote: "Before the GI Bill, college was largely a privilege of the wealthy. The flood of veterans into universities transformed higher education in America. Enrollment at American colleges and universities went from 1,677,000 in 1945 to 2,659,000 in 1950."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Dunkirk Evacuation",
        text: "Between May 26 and June 4, 1940, the British evacuated 338,226 Allied soldiers from the beaches of Dunkirk, France. The retreating armies were trapped against the English Channel by advancing German forces. In a desperate rescue, 850 \"little ships\" \u2014 fishing boats, pleasure yachts, lifeboats, even a paddle steamer \u2014 crossed the Channel alongside Royal Navy destroyers.",
        footnote: "Churchill warned Parliament not to call the evacuation a victory: 'Wars are not won by evacuations.' But the rescue of the army preserved the core of British military capability and became a powerful symbol of resilience. The phrase 'Dunkirk spirit' entered the English language."
    },
    {
        era: "The World at War Again \u00b7 1939\u20131945",
        title: "The Tuskegee Airmen",
        text: "The Tuskegee Airmen were the first Black military aviators in the United States Armed Forces. The 332nd Fighter Group flew more than 15,000 sorties in Europe. They earned 150 Distinguished Flying Crosses and a Presidential Unit Citation. Their record helped pave the way for the integration of the U.S. military, which President Truman ordered in 1948.",
        footnote: "The Tuskegee program was launched partly as an experiment to see whether Black men could fly combat aircraft \u2014 a question rooted in the racism of the era. The airmen answered it decisively. Their success made segregation in the military increasingly indefensible."
    },

    // =================================================================
    // BY THE NUMBERS · 1900–1945
    // Numbers, dates, statistics, and special characters
    // =================================================================

    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Century in Statistics",
        text: "In 1900, the U.S. population was 76,212,168. By 1945, it had reached 139,928,165. Life expectancy rose from 47.3 years to 65.9 years. In 1900, only 6.4% of Americans had graduated high school. A loaf of bread cost $0.05, a gallon of milk $0.27, and the average annual wage was $438.00. By 1945, bread cost $0.09, milk was $0.63, and average wages had risen to $2,595.00.",
        footnote: "The most dramatic shift was urbanization. In 1900, 60% of Americans lived in rural areas. By 1940, more than 56% lived in cities."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Cost of Two World Wars",
        text: "World War I lasted 1,566 days. The U.S. spent $33,625,000,000 on the conflict. American casualties totaled 320,518: 116,516 killed and 204,002 wounded. World War II lasted 2,194 days. U.S. expenditures reached $341,000,000,000. American casualties were far greater: 1,076,245 total, with 405,399 killed and 670,846 wounded. Combined, the two wars cost $374,625,000,000.",
        footnote: "Global military deaths in World War I reached approximately 9,700,000. In World War II, an estimated 70,000,000 to 85,000,000 people died, making it the deadliest conflict in human history."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Dates That Changed Everything",
        text: "April 18, 1906: the San Francisco earthquake. April 15, 1912: the Titanic sinks. June 28, 1914: Archduke Franz Ferdinand assassinated. November 11, 1918: the Armistice. January 16, 1920: Prohibition begins. October 29, 1929: Black Tuesday. March 4, 1933: FDR inaugurated. September 1, 1939: Germany invades Poland. December 7, 1941: Pearl Harbor. June 6, 1944: D-Day. August 6, 1945: Hiroshima.",
        footnote: "Of all these dates, December 7, 1941 may have had the most immediate impact on American life. Within 24 hours, Congress declared war with only 1 dissenting vote."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Immigration by the Numbers",
        text: "Between 1900 and 1915, over 15,000,000 immigrants arrived in the United States. In the peak year of 1907, 1,285,349 people passed through Ellis Island alone. They came from Italy (3,156,000), Russia (2,519,000), Austria-Hungary (2,145,000), and dozens of other nations. The Immigration Act of 1924 slashed quotas to 164,667 per year, reducing the flow by roughly 80%.",
        footnote: "Ellis Island processed approximately 12,000,000 immigrants between 1892 and 1954. Inspectors had just 6 seconds to make an initial assessment of each person."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Model T: Mass Production",
        text: "The Ford Model T: first produced in 1908, last produced in 1927. Total units built: 15,007,034. Price in 1908: $850.00. Price in 1925: $260.00. Top speed: 40\u201345 mph. Engine: 20 horsepower, 4 cylinders. Fuel economy: 13\u201321 miles per gallon. Available colors after 1914: black (and only black). Weight: 1,200 pounds. The car that put America on wheels.",
        footnote: "Ford's famous quote about color options \u2014 'Any customer can have a car painted any colour that he wants so long as it is black' \u2014 was a production efficiency decision. Black paint dried fastest, and speed on the assembly line was everything."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Great Depression in Numbers",
        text: "Peak unemployment: 24.9% (1933). Bank failures: 9,000+ between 1930 and 1933. GDP decline: -26.7% from 1929 to 1933. Stock market decline: -89.2% from peak to trough. Average family income: dropped from $2,300 to $1,500. Farm income: fell 60%. Homelessness: estimated 2,000,000 Americans. Suicide rate: rose 22.8% between 1929 and 1932.",
        footnote: "The Depression did not affect everyone equally. Wealthy families saw their fortunes shrink but generally survived. Working-class and poor families \u2014 especially Black Americans and rural farmers \u2014 bore the heaviest burden."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "World War II Production Miracle",
        text: "Between 1942 and 1945, American factories produced: 296,429 aircraft, 102,351 tanks and self-propelled guns, 372,431 artillery pieces, 47,000,000 tons of ammunition, 87,620 warships and landing craft, 2,710 Liberty ships, 5,822,000 mines, and 44,000,000,000 rounds of small-arms ammunition. The United States outproduced every other nation on Earth \u2014 combined.",
        footnote: "Henry Kaiser's shipyards could build a Liberty ship in as few as 42 days. One ship, the SS Robert E. Peary, was assembled in just 4 days, 15 hours, and 29 minutes as a publicity stunt."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The New Deal Alphabet Soup",
        text: "FDR's New Deal created a bewildering array of agencies: the AAA (Agricultural Adjustment Act), CCC (Civilian Conservation Corps), CWA (Civil Works Administration), FDIC (Federal Deposit Insurance Corporation), FHA (Federal Housing Administration), NRA (National Recovery Administration), PWA (Public Works Administration), SEC (Securities and Exchange Commission), SSA (Social Security Administration), TVA (Tennessee Valley Authority), and WPA (Works Progress Administration).",
        footnote: "The WPA alone employed 8,500,000 people between 1935 and 1943. Its projects included constructing 650,000 miles of highways, building or repairing 124,000 bridges, erecting 125,000 public buildings, and producing 475,000 works of art."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Prices Then and Now: A Comparison",
        text: "In 1920: a new house cost $6,296, a new car cost $1,510, gasoline was $0.33/gallon, a movie ticket was $0.15, a stamp was $0.02, and a pound of butter was $0.70. Average annual income was $3,269.40. A teacher earned approximately $970 per year. A doctor earned $3,150. The president earned $75,000. Babe Ruth earned $20,000 \u2014 and thought he deserved more.",
        footnote: "Adjusting for inflation, that $6,296 house would cost roughly $98,000 in 2025 dollars. The average new home in 2025 costs over $400,000, suggesting that housing has become far less affordable relative to income than it was a century ago."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Casualties of Trench Warfare",
        text: "Battle of the Marne (1914): 500,000 casualties. Battle of Verdun (1916): 714,231 casualties. Battle of the Somme (1916): 1,219,201 casualties. Passchendaele (1917): 475,000+ casualties. Meuse-Argonne (1918): 350,000+ casualties. Total military deaths in World War I: approximately 9,700,000. Total civilian deaths: approximately 7,000,000. Wounded: approximately 21,000,000.",
        footnote: "The Battle of the Somme saw 57,470 British casualties on its first day alone \u2014 July 1, 1916 \u2014 making it the bloodiest day in British military history. The battle lasted 141 days and gained approximately 6 miles of territory."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Radio's Explosive Growth",
        text: "Radio stations in 1920: 1. Radio stations in 1922: 576. Radio stations in 1930: 618. Households with radios in 1922: 60,000 (0.2%). Households with radios in 1930: 12,078,345 (40.3%). Households with radios in 1940: 28,500,000 (81.0%). Cost of an average radio in 1920: $75.00. Cost in 1930: $35.00. Most popular program in 1937: \"The Chase and Sanborn Hour\" with Edgar Bergen (39.7% share).",
        footnote: "The radio industry went from zero to a $600,000,000 business in under a decade. Nothing in media history had grown so fast until the rise of the internet seventy years later."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "The Human Toll of the Holocaust",
        text: "Jews murdered: 6,000,000 (approximately 2/3 of European Jewry). Roma murdered: 220,000\u2013500,000. Soviet POWs murdered: approximately 3,000,000. Disabled people murdered: approximately 250,000. Homosexuals murdered: approximately 5,000\u201315,000. Largest death camp (Auschwitz-Birkenau): 1,100,000 killed. At peak operation, Auschwitz killed 6,000 people per day.",
        footnote: "The sheer scale of the numbers can obscure individual suffering. Each of the 6,000,000 was a person with a name, a family, hopes, and fears. Holocaust memorials around the world attempt to restore that individuality to the victims."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "Ticker Tape: The 1929 Crash Day by Day",
        text: "October 24 (\"Black Thursday\"): 12,894,650 shares traded. October 28 (\"Black Monday\"): the Dow fell 12.82%. October 29 (\"Black Tuesday\"): 16,410,030 shares traded; the Dow fell another 11.73%. By November 13, the Dow had fallen from its September high of 381.17 to 198.60 \u2014 a drop of 47.9% in less than two months. The bottom would not come until July 8, 1932, at 41.22 \u2014 a total decline of 89.2%.",
        footnote: "The ticker tape machines that reported stock prices could not keep up with the volume of trades on Black Tuesday. By the end of the day, they were running nearly two and a half hours behind. Investors had no idea what their stocks were actually worth."
    },
    {
        era: "By the Numbers \u00b7 1900\u20131945",
        title: "D-Day by the Numbers",
        text: "Date: June 6, 1944. Beaches: 5 (Utah, Omaha, Gold, Juno, Sword). Troops landed by sea: 132,715. Airborne troops: 23,400. Naval vessels: 6,939. Aircraft sorties: 14,674. Tons of supplies landed: 326,547 (by June 11). Allied casualties on D-Day: approximately 10,000. German casualties: approximately 4,000\u20139,000. By the end of June, 850,000 Allied troops were in France.",
        footnote: "The logistics of D-Day were staggering. Artificial harbors called 'Mulberries' were towed across the English Channel and assembled off the Normandy coast. An undersea fuel pipeline called PLUTO (Pipe-Lines Under The Ocean) supplied gasoline directly from England to France."
    },

    // =================================================================
    // PUNCTUATION PRACTICE · Various
    // Heavy use of quotes, dashes, colons, and special characters
    // =================================================================

    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Churchill's Finest Hours",
        text: "\"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.\" \u2014 Winston Churchill, June 4, 1940. \"Never in the field of human conflict was so much owed by so many to so few.\" \u2014 Winston Churchill, August 20, 1940.",
        footnote: "Churchill dictated most of his speeches while pacing, whisky in hand. He rehearsed them extensively and was known to practice his delivery in the bathtub. He understood that in wartime, words could be as powerful as weapons."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Roosevelt's Declarations",
        text: "\"The only thing we have to fear is fear itself.\" \u2014 FDR, March 4, 1933. \"Yesterday, December 7, 1941 \u2014 a date which will live in infamy \u2014 the United States of America was suddenly and deliberately attacked.\" \u2014 FDR, December 8, 1941. \"In the future days, which we seek to make secure, we look forward to a world founded upon four essential human freedoms.\" \u2014 FDR, January 6, 1941.",
        footnote: "Roosevelt's 'Four Freedoms' were freedom of speech, freedom of worship, freedom from want, and freedom from fear. Norman Rockwell's paintings of the Four Freedoms became iconic images of American ideals during the war."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Voices of Dissent and Hope",
        text: "\"One has a moral responsibility to disobey unjust laws.\" \u2014 borrowed and paraphrased across the era. \"No one can make you feel inferior without your consent.\" \u2014 Eleanor Roosevelt. \"Injustice anywhere is a threat to justice everywhere.\" \u2014 a principle that echoed through the labor halls, the suffrage marches, and the early civil rights movement.",
        footnote: "Eleanor Roosevelt transformed the role of First Lady from a ceremonial position into a platform for advocacy. She held press conferences, wrote a daily newspaper column, and championed civil rights at a time when doing so was politically dangerous."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Headlines That Shook the World",
        text: "\"TITANIC SINKS FOUR HOURS AFTER HITTING ICEBERG\" \u2014 The New York Times, April 16, 1912. \"ARMISTICE SIGNED, END OF THE WAR!\" \u2014 The New York Times, November 11, 1918. \"WALL ST. LAYS AN EGG\" \u2014 Variety, October 30, 1929. \"WAR! OAHU BOMBED BY JAPANESE PLANES\" \u2014 Honolulu Star-Bulletin, December 7, 1941. \"MEN WALK ON MOON\" \u2014 wait, that's the next century.",
        footnote: "Variety's 'Wall St. Lays an Egg' is considered one of the greatest headlines in journalism history. The entertainment trade paper used show-business slang to announce the stock market crash, perfectly capturing the theatrical absurdity of the moment."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Letters from the Front",
        text: "\"Dear Mother: I am well. The food is bad but we manage. The noise never stops \u2014 shells, machine guns, aircraft. A man can go mad from it. I saw Jenkins fall today; he was beside me one moment and gone the next. Don't worry about me. I will come home. Give my love to Father and the girls. Your son, William.\" \u2014 composite, based on real WWI letters.",
        footnote: "Soldiers' letters were subject to censorship. They could not mention specific locations, unit numbers, or upcoming operations. Many wrote in code or between the lines. The letters that survived are among the most powerful firsthand accounts of the war."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "Telegram Style: Short and Sharp",
        text: "LUSITANIA SUNK NO WARNING STOP 1198 DEAD STOP AMERICANS AMONG VICTIMS STOP. STOCK MARKET CRASHED STOP BILLIONS LOST STOP BANKS CLOSING STOP. JAPAN ATTACKED PEARL HARBOR STOP FLEET DAMAGED STOP CASUALTIES HEAVY STOP. PARIS LIBERATED STOP CROWDS IN STREETS STOP BELLS RINGING STOP. WAR OVER STOP JAPAN SURRENDERED STOP BOYS COMING HOME STOP.",
        footnote: "Telegrams charged by the word, so brevity was essential. The word STOP was used instead of a period because punctuation marks could be garbled in transmission. This terse style became its own form of communication, conveying urgency through compression."
    },
    {
        era: "Words of the Era \u00b7 1900\u20131945",
        title: "The Language of Jazz",
        text: "In the jazz clubs of Harlem and Chicago, a new vocabulary emerged: cats and chicks, hip and square, cool and hot, solid and groovy. A musician who could really play was \"in the groove.\" A bad performance was a \"clam.\" Money was \"bread.\" To understand was to \"dig.\" If something was excellent, it was \"the bee's knees\" or \"the cat's meow.\" The language was as improvisational as the music itself.",
        footnote: "Much of modern American slang traces its roots to jazz culture. Words like 'cool,' 'hip,' 'gig,' and 'jam' all entered mainstream English through jazz musicians and the African American community. The music changed not only how America sounded, but how it spoke."
    },

    // =================================================================
    // SHORT SPRINTS · Quick passages for fast practice
    // =================================================================

    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "The Lusitania: 18 Minutes",
        text: "Torpedoed at 2:10 p.m. Sank by 2:28 p.m. 18 minutes. 1,198 dead. 128 Americans. One torpedo. One ship. One turning point.",
        footnote: "The speed of the sinking was unusual and suggests a secondary internal explosion, possibly caused by munitions secretly stored in the ship's cargo hold. The British government has never fully declassified its records on the Lusitania's cargo manifest."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "Einstein's Miracle Year",
        text: "In 1905, a 26-year-old patent clerk in Bern, Switzerland, published four papers that revolutionized physics. Special relativity. The photoelectric effect. Brownian motion. Mass-energy equivalence: E = mc\u00b2. His name was Albert Einstein.",
        footnote: "Einstein was unable to find an academic position after completing his doctorate. He took the patent office job out of necessity. The papers he produced while working there full-time are considered the greatest intellectual achievement in the history of physics."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "The Zimmermann Telegram",
        text: "January 1917. A coded German telegram to Mexico. Intercepted by British intelligence. The message: if Mexico would declare war on the United States, Germany would help Mexico reclaim Texas, New Mexico, and Arizona. The telegram was made public on March 1. America declared war on April 6.",
        footnote: "The telegram was sent by German Foreign Secretary Arthur Zimmermann. When confronted, he did not deny it \u2014 he confirmed it. His honesty may have been the single most consequential diplomatic blunder of the war."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "Orson Welles: Boy Wonder",
        text: "\"The War of the Worlds\" broadcast: age 23. \"Citizen Kane\": age 25. By 30, Orson Welles had changed both radio and cinema forever. He spent the rest of his life trying to recapture that early brilliance \u2014 and in many ways, he did.",
        footnote: "Welles once said: 'I started at the top and worked my way down.' It was characteristically witty and not entirely true. His later films, including 'The Magnificent Ambersons' and 'Touch of Evil,' are now considered masterpieces, though they were underappreciated in his lifetime."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "The Ride of the Valkyries",
        text: "Kitty Hawk: December 17, 1903. First commercial flight (St. Petersburg to Tampa): January 1, 1914. Lindbergh crosses the Atlantic: May 20, 1927. Amelia Earhart crosses the Atlantic solo: May 20, 1932. First jet aircraft: August 27, 1939. B-29 drops atomic bomb: August 6, 1945. In 42 years, flight went from 12 seconds over sand to ending a world war.",
        footnote: "Orville Wright lived until January 30, 1948. In his lifetime, he witnessed the progression from his 12-second flight to supersonic jet aircraft and the beginning of the space age. When asked about the atomic bomb being delivered by aircraft, he expressed deep regret about what flight had been used for."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "Three Words",
        text: "\"I do.\" \u2014 every soldier's sweetheart. \"Nuts!\" \u2014 General McAuliffe at Bastogne. \"Unconditional surrender.\" \u2014 Allied demand at Casablanca. \"Day of infamy.\" \u2014 Roosevelt on Pearl Harbor. \"Never surrender.\" \u2014 Churchill to Britain. \"Fear itself.\" \u2014 Roosevelt to America. \"We can do it!\" \u2014 Rosie to everyone.",
        footnote: "Great phrases endure because they compress enormous meaning into very few words. Each of these phrases became shorthand for an entire moment in history, immediately understood by anyone who lived through the era."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "The Cost of a Stamp",
        text: "$0.02 in 1900. $0.02 in 1917 (raised to $0.03 for the war effort). $0.03 from 1919 to 1932. Back to $0.02 in 1932. Up to $0.03 again in 1958. A first-class stamp stayed under $0.05 for over 60 years. Letters were the lifeblood of communication; keeping postage affordable was a national priority.",
        footnote: "During World War II, the military introduced V-mail (Victory mail): letters were photographed, shrunk to thumbnail size, shipped on microfilm, and reprinted at the destination. This saved enormous cargo space. A single mail sack of V-mail film replaced 37 sacks of conventional letters."
    },
    {
        era: "Quick Study \u00b7 1900\u20131945",
        title: "Houdini's Last Act",
        text: "Harry Houdini died on October 31, 1926 \u2014 Halloween. He was 52. The cause: a ruptured appendix, possibly aggravated when a college student punched him repeatedly in the stomach. Houdini had spent his career defying death: escaping from handcuffs, straitjackets, locked trunks submerged in rivers, and even a sealed coffin buried underground. In the end, death escaped him.",
        footnote: "Houdini was also a fierce debunker of spiritualists and mediums. He attended seances in disguise and exposed their tricks. Before dying, he told his wife a secret code word. If any medium could produce it, she should believe the afterlife was real. She held annual seances for ten years. No one ever produced the word."
    },

    // =================================================================
    // ENDURANCE · Longer passages for sustained practice
    // =================================================================

    {
        era: "Deep Dive \u00b7 1900\u20131945",
        title: "The Great Migration",
        text: "Between 1910 and 1970, approximately 6,000,000 African Americans left the rural South for cities in the North, Midwest, and West. They fled Jim Crow laws, lynchings, sharecropping, and the daily humiliations of segregation. They sought factory jobs, better schools for their children, and the basic dignity of being treated as human beings. They settled in Chicago, Detroit, New York, Los Angeles, and dozens of other cities, transforming American culture in the process. The music they brought \u2014 blues, jazz, gospel \u2014 became the soundtrack of the century. The writers who emerged from their communities \u2014 Richard Wright, Ralph Ellison, Gwendolyn Brooks \u2014 reshaped American literature. The political power they built in northern cities would eventually fuel the civil rights movement.",
        footnote: "The Great Migration is one of the largest internal migrations in history. The historian Isabel Wilkerson has called it 'the biggest underreported story of the twentieth century.' Her book 'The Warmth of Other Suns' is a masterful account of the migration and its consequences."
    },
    {
        era: "Deep Dive \u00b7 1900\u20131945",
        title: "The Rise and Fall of Prohibition",
        text: "The temperance movement had been building for decades when the 18th Amendment was ratified on January 16, 1919. Supporters believed that banning alcohol would reduce crime, poverty, and domestic violence. The opposite happened. Organized crime exploded. Speakeasies \u2014 illegal bars \u2014 appeared on nearly every block in major cities. Al Capone's Chicago operation took in $60,000,000 per year from bootlegging alone. Corruption spread to police departments, judges, and politicians. The government poisoned industrial alcohol to discourage drinking; an estimated 10,000 people died as a result. By the early 1930s, public opinion had turned decisively against Prohibition. The 21st Amendment repealed it on December 5, 1933. It remains the only constitutional amendment to have been entirely undone by another.",
        footnote: "On the night Prohibition ended, FDR reportedly said: 'What America needs now is a drink.' Whether he actually said it is unclear, but the sentiment was widely shared. Bars across the country opened at 12:01 a.m. on December 6."
    },
    {
        era: "Deep Dive \u00b7 1900\u20131945",
        title: "The Atomic Age Begins",
        text: "At 5:29 a.m. on July 16, 1945, the first atomic bomb was detonated at the Trinity test site in the Jornada del Muerto desert of New Mexico. The explosion produced a mushroom cloud that rose 40,000 feet. The flash was visible 200 miles away. The blast crater was 5 feet deep and 30 feet wide, and the sand beneath the tower had been fused into a glassy substance later named trinitite. The scientists who witnessed the test had mixed reactions. Some cheered. Others wept. J. Robert Oppenheimer recalled a line from the Bhagavad Gita: \"Now I am become Death, the destroyer of worlds.\" Kenneth Bainbridge turned to Oppenheimer and said: \"Now we are all sons of bitches.\" Three weeks later, the bomb was used on Hiroshima. Three days after that, on Nagasaki. Japan surrendered on August 15. The world had changed forever.",
        footnote: "Several Manhattan Project scientists, including Leo Szilard, circulated a petition urging President Truman not to use the bomb on a civilian population without first demonstrating it to Japan. The petition never reached Truman. The decision to use the bomb remains one of the most consequential and debated choices in human history."
    },
    {
        era: "Deep Dive \u00b7 1900\u20131945",
        title: "The Suffrage Movement's Long Road",
        text: "The fight for women's suffrage in the United States lasted 72 years. It began at the Seneca Falls Convention in 1848, where Elizabeth Cady Stanton and Lucretia Mott organized the first women's rights convention. The Declaration of Sentiments, modeled on the Declaration of Independence, declared: \"We hold these truths to be self-evident: that all men and women are created equal.\" The movement endured decades of ridicule, arrest, forced feeding of imprisoned suffragists, and political betrayal. Susan B. Anthony was arrested for voting illegally in 1872. Alice Paul organized massive protests and was jailed and force-fed in 1917. Carrie Chapman Catt built the political coalition that finally pushed the 19th Amendment through Congress in 1919. Ratification came on August 18, 1920, when Tennessee's vote put it over the top. Neither Stanton nor Anthony lived to see it.",
        footnote: "The 19th Amendment did not immediately enfranchise all women. Many Black women, Native American women, and Asian American women continued to face barriers to voting through poll taxes, literacy tests, and other discriminatory practices. True universal women's suffrage would take decades more of struggle."
    },
    {
        era: "Deep Dive \u00b7 1900\u20131945",
        title: "The TVA: Remaking a Region",
        text: "In May 1933, Congress created the Tennessee Valley Authority to develop the impoverished Tennessee River valley. The TVA built 16 dams, generated cheap hydroelectric power, controlled devastating floods, improved navigation, and introduced modern agricultural techniques to some of the poorest communities in America. Before the TVA, only 2% of farms in the region had electricity. Within a decade, most did. The TVA employed 28,000 workers at its peak and brought an entire region into the twentieth century. It also displaced 15,000 families whose homes were flooded by the reservoirs. For those families, the progress of the many came at the expense of the few \u2014 a tension that runs through every story of modernization. Critics called it socialism; supporters called it salvation. It was both, and neither, and something uniquely American.",
        footnote: "The TVA still operates today, providing electricity to 10,000,000 people across seven states. It is one of the few New Deal agencies that survived intact and continues to function essentially as originally designed."
    }

];
