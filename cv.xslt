<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Curriculum Vitae</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        line-height: 1.6;
                    }
                    .header {
                        background-color: #f4f4f4;
                        padding: 10px;
                        border-bottom: 2px solid #ddd;
                    }
                    .section {
                        margin-top: 20px;
                    }
                    .section h2 {
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 5px;
                        color: #333;
                    }
                    .item {
                        margin-bottom: 10px;
                    }
                    .item h3 {
                        margin: 5px 0;
                        color: #555;
                    }
                    .item p {
                        margin: 0;
                    }
                    .contact a {
                        color: #333;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1><xsl:value-of select="CV/PersonalInfo/FirstName"/> <xsl:value-of select="CV/PersonalInfo/LastName"/></h1>
                    <div class="contact">
                        <p>Email: <a href="mailto:{CV/PersonalInfo/Email}"><xsl:value-of select="CV/PersonalInfo/Email"/></a></p>
                        <p>Phone: <xsl:value-of select="CV/PersonalInfo/Phone"/></p>
                        <p>Address: <xsl:value-of select="CV/PersonalInfo/Address"/></p>
                        <p>LinkedIn: <a href="{CV/PersonalInfo/LinkedIn}"><xsl:value-of select="CV/PersonalInfo/LinkedIn"/></a></p>
                        <p>GitHub: <a href="{CV/PersonalInfo/GitHub}"><xsl:value-of select="CV/PersonalInfo/GitHub"/></a></p>
                    </div>
                </div>

                <div class="section">
                    <h2>Education</h2>
                    <xsl:for-each select="CV/Education">
                        <div class="item">
                            <h3><xsl:value-of select="Degree"/></h3>
                            <p><xsl:value-of select="Institution"/> - <xsl:value-of select="Year"/></p>
                        </div>
                    </xsl:for-each>
                </div>

                <div class="section">
                    <h2>Work Experience</h2>
                    <xsl:for-each select="CV/WorkExperience">
                        <div class="item">
                            <h3><xsl:value-of select="Position"/></h3>
                            <p><xsl:value-of select="Company"/> (<xsl:value-of select="StartDate"/> - <xsl:choose>
                                <xsl:when test="EndDate"><xsl:value-of select="EndDate"/></xsl:when>
                                <xsl:otherwise>Present</xsl:otherwise>
                            </xsl:choose>)</p>
                            <p><xsl:value-of select="Description"/></p>
                        </div>
                    </xsl:for-each>
                </div>

                <div class="section">
                    <h2>Skills</h2>
                    <ul>
                        <xsl:for-each select="CV/Skills/Skill">
                            <li><xsl:value-of select="."/></li>
                        </xsl:for-each>
                    </ul>
                </div>

                <div class="section">
                    <h2>Languages</h2>
                    <xsl:for-each select="CV/Languages/Language">
                        <div class="item">
                            <h3><xsl:value-of select="Name"/></h3>
                            <p>Proficiency: <xsl:value-of select="Proficiency"/></p>
                        </div>
                    </xsl:for-each>
                </div>

                <div class="section">
                    <h2>Projects</h2>
                    <xsl:for-each select="CV/Projects/Project">
                        <div class="item">
                            <h3><xsl:value-of select="Title"/></h3>
                            <p><xsl:value-of select="Description"/></p>
                            <xsl:if test="Link">
                                <p>Link: <a href="{Link}"><xsl:value-of select="Link"/></a></p>
                            </xsl:if>
                        </div>
                    </xsl:for-each>
                </div>

                <div class="section">
                    <h2>Certifications</h2>
                    <xsl:for-each select="CV/Certifications/Certification">
                        <div class="item">
                            <h3><xsl:value-of select="Title"/></h3>
                            <p><xsl:value-of select="Institution"/> - <xsl:value-of select="Year"/></p>
                        </div>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
