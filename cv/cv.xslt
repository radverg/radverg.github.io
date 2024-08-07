<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
        <html lang="{CV/@lang}">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>
                    <xsl:value-of select="CV/PersonalInfo/FirstName"/> 
                    <xsl:value-of select="CV/PersonalInfo/LastName"/> - CV
                </title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous" />
                <link rel="stylesheet" href="cv.css" />
            </head>

            <body>
                <main>
                    <div class="side-container">
                        <section>
                            <div class="portrait-container"><img class="portrait" src="{CV/Portrait}"/></div>
                            <h1><xsl:value-of select="CV/PersonalInfo/FirstName"/> 
                                <xsl:value-of select="CV/PersonalInfo/LastName"/>
                            </h1>
                            <p><xsl:value-of select="CV/PersonalInfo/BioCaption"/></p>
                        </section>

                        <section>
                            <h2><xsl:value-of select="CV/PersonalInfo/@title" /></h2>
                            <dl>
                                <div>
                                    <dt class="icon-container"><i class="bi bi-envelope"></i></dt>
                                    <dd><a href="mailto:{CV/PersonalInfo/Email}"><xsl:value-of select="CV/PersonalInfo/Email"/></a></dd>
                                </div>
                            
                                <div>
                                    <dt class="icon-container"><i class="bi bi-phone"></i></dt>
                                    <dd><xsl:value-of select="CV/PersonalInfo/Phone"/></dd>
                                </div>
                            
                                <!-- Github -->
                                <div>
                                    <dt class="icon-container"><i class="bi bi-github"></i></dt>
                                    <dd><a href="{CV/PersonalInfo/GitHub/Href}"><xsl:value-of select="CV/PersonalInfo/GitHub/Caption"/></a></dd>
                                </div>

                                <!-- LinkedIn -->
                                <div>
                                    <dt class="icon-container"><i class="bi bi-linkedin"></i></dt>
                                    <dd><a href="{CV/PersonalInfo/LinkedIn/Href}"><xsl:value-of select="CV/PersonalInfo/LinkedIn/Caption"/></a></dd>
                                </div>
                            
                                <!-- Birth date -->
                                <div>
                                    <dt class="icon-container"><i class="bi bi-calendar-event"></i></dt>
                                    <dd><xsl:value-of select="CV/PersonalInfo/Birth/Date"/> (<xsl:value-of select="CV/PersonalInfo/Birth/Age"/>) </dd>
                                </div>
                            </dl>
                        </section>

                        <xsl:for-each select="CV/SkillSet">
                            <section>
                                <h2><xsl:value-of select="@title" /></h2>
                                <ul class="item-list">
                                    <xsl:for-each select="Skill">
                                        <li><xsl:value-of select="."/></li>
                                    </xsl:for-each>
                                </ul>
                            </section>
                        </xsl:for-each>


                        <section>
                            <h2><xsl:value-of select="CV/Languages/@title" /></h2>
                            <ul class="item-list">
                                <xsl:for-each select="CV/Languages/Language">
                                    <li><strong><xsl:value-of select="Name"/></strong>, <xsl:value-of select="Proficiency"/></li>
                                </xsl:for-each>
                            </ul>
                        </section>


                        <xsl:if test="CV/Interests">
                            <section>
                                <h2><xsl:value-of select="CV/Interests/@title" /></h2>
                                <ul class="item-list">
                                    <xsl:for-each select="CV/Interests/Interest">
                                        <li><xsl:value-of select="."/></li>
                                    </xsl:for-each>
                                </ul>
                            </section>
                        </xsl:if>

                    </div>

                    <div class="main-container">
                        <section>
                            
                            <h2>Pracovní projekty a zaměstnání</h2>
                            
                            <article>
                                <h3>2018-2023 CEITEC MU (Masarykova Univerzita)</h3>
                                <p>Vývoj monolitických webových informačních systémů:

                                    <ul>
                                        <li><strong>Project management</strong> - správa projektů několika laboratoří CEITECu, evidence a vyhodnocování žádostí </li>
                                        <li><strong>CF accounting and reporting</strong> - kvartální reporty a vyúčtování využitých služeb facility zákazníky</li>
                                        <li><strong>LIMS - Laboratory information management system</strong> - několik modulů pro potřeby laboratoře CryoEM, zpracování výstupních
                                        snímků elektronových mikroskopů a jejich transport z laboratoře k uživatelům, např. přes cloudové řešení iRODS, nasazení 
                                        systému u partnerské laboratoře v Madridu a s tím související zahraniční stáž</li>
                                    </ul>
                                </p>

                                <ul class="item-list">
                                    <li>C#</li>
                                    <li>Python</li>
                                    <li>ASP.NET Core</li>
                                    <li>HTML/CSS/JS</li>
                                    <li>Websockety</li>
                                    <li>Blazor</li>
                                    <li>PHP</li>
                                    <li>Angular</li>
                                    <li>MySQL</li>
                                    <li>SQLite</li>
                                </ul>
                            </article>

                            
                            <article>
                                <h3>2019 - CESNET</h3>
                                <p>Vývoj překladače jazyka P4 v C++, placená stáž v rámci školy. Výstupem jsou také dvě zpracované zprávy o práci, kde se lze dozvědět detaily.</p>
                                <ol>
                                    <li><a href="https://github.com/radverg/projects/blob/main/fit-ip-p4-vhdl/projektova_praxe1.pdf">Kompilátor P4.16 - Překlad kontrolního programu</a></li>
                                    <li><a href="https://github.com/radverg/projects/blob/main/fit-ip-p4-vhdl/projektova_praxe2.pdf">Ovladač libp4dev verze 4</a></li>
                                </ol>
                                
                                <ul class="item-list">
                                    <li>C++</li>
                                    <li>P4</li>
                                    <li>VHDL</li>
                                    <li>Python</li>
                                </ul>
                                
                            </article>
                                
                            <article>
                                <h3>2018 - itnetwork.cz</h3>
                                <p>Psaní výukových článků a programování editoru diagramů.</p>
                                <ul class="item-list">
                                    <li>JavaScript</li>
                                    <li>TypeScript</li>
                                    <li>node.js</li>
                                </ul>
                            </article>

                        </section>

                        <section>
                            <h2>Vzdělání</h2>

                            <article>
                                <h3>2022 - VUT Brno, Fakulta informačních technologií, Bc. </h3>
                                <p>
                                    Externí závěrečná práce v rámci práce v CEITEC MU s výsledky využitými a nasazenými v praxi.  
                                    Věnuje se vývoji zmíněného informačního systému správy projektů v jednotlivých fázích vývojového cyklu softwaru.
                                    Veřejně k dispozici na <a href="https://www.vut.cz/studenti/zav-prace/detail/145299">stránkách školy.</a>
                                </p>
                            </article>

                        </section>

                        <section>
                            <h2>Nepracovní projekty</h2>

                            <article>
                                <h3>Tank Hunt Online</h3>
                                <p>Multiplayerová webová 2D hra, střílečka s tanky. Obsadila druhé místo v <a href="https://www.itnetwork.cz/programovani/programatorske-souteze/itnetwork-summer-2018">soutěži na itnewtork.cz</a> </p>
                                <ul class="item-list">
                                    <li>NodeJS</li>
                                    <li>TypeScript</li>
                                    <li>Phaser.io</li>
                                    <li>socket.io</li>
                                </ul>
                            </article>

                            <article>
                                <h3>Školní projekty</h3>
                                <p>malý informační systém pro rezervace a pro evidenci pacientů a lékařských zpráv, vektorizace a paralelizace algoritmu pomocí OpenMP, základ DSP (digital signal processing) mluvené řeči,
                                    tvorba a tréning jednoduchého klasifikačního AI modelu, práce s daty pomocí Pandas, ...
                                </p>
                                <ul class="item-list">
                                    <li>C/C++, OpenMP</li>
                                    <li>Python - Pandas</li>
                                    <li>C# - ASP.NET Core</li>
                                    <li>HTML/CSS/JS</li>
                                </ul>
                            </article>

                            <article>
                                <h3>Hromada malých projektíků, ...</h3>
                                <p>... aneb šachové hodiny, zkoušeč slovíček a další jednoduché programy s GUI, nebo třeba i tento HTML/CSS životopis :) </p>
                                <ul class="item-list">
                                    <li>WinForms</li>
                                    <li>WPF</li>
                                    <li>C#</li>
                                    <li>VB.NET</li>
                                </ul>
                                
                            </article>
                            
                            <p>Některé školní a osobní projekty jsou veřejně k dispozici <a href="https://github.com/radverg">na mém githubu.</a></p>
                        </section>
                    </div>

                </main>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
