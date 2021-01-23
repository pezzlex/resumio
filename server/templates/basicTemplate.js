const texContent = ({
  contact: { firstName, lastName, email, phone, linkedIn, github },
  workExperience,
  education,
  projects,
  skills,
}) => {
  let ret =
    `%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
    \\textbf{\\Huge \\scshape ${firstName} ${lastName}} \\\\ \\vspace{1pt}
    ` +
    (phone ? `\\small ${phone} $|$` : '') +
    (email ? `\\href{mailto:${email}}{\\underline{${email}}} $|$` : '') +
    (linkedIn ? `\\href{${linkedIn}}{\\underline{${linkedIn}}} $|$` : '') +
    (github ? `\\href{${github}}{\\underline{${github}}}` : '') +
    `\\end{center}



%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Southwestern University}{Georgetown, TX}
      {Bachelor of Arts in Computer Science, Minor in Business}{Aug. 2018 -- May 2021}
    \\resumeSubheading
      {Blinn College}{Bryan, TX}
      {Associate's in Liberal Arts}{Aug. 2014 -- May 2018}
  \\resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart

    \\resumeSubheading
      {Undergraduate Research Assistant}{June 2020 -- Present}
      {Texas A\\&M University}{College Station, TX}
      \\resumeItemListStart
        \\resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems}
        \\resumeItem{Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data}
        \\resumeItem{Explored ways to visualize GitHub collaboration in a classroom setting}
      \\resumeItemListEnd
      
% -----------Multiple Positions Heading-----------
%    \\resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \\resumeItemListStart
%        \\resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \\resumeItemListEnd
%    \\resumeSubHeadingListEnd
%-------------------------------------------

    \\resumeSubheading
      {Information Technology Support Specialist}{Sep. 2018 -- Present}
      {Southwestern University}{Georgetown, TX}
      \\resumeItemListStart
        \\resumeItem{Communicate with managers to set up campus computers used on campus}
        \\resumeItem{Assess and troubleshoot computer problems brought by students, faculty and staff}
        \\resumeItem{Maintain upkeep of computers, classroom equipment, and 200 printers across campus}
    \\resumeItemListEnd

    \\resumeSubheading
      {Artificial Intelligence Research Assistant}{May 2019 -- July 2019}
      {Southwestern University}{Georgetown, TX}
      \\resumeItemListStart
        \\resumeItem{Explored methods to generate video game dungeons based off of \\emph{The Legend of Zelda}}
        \\resumeItem{Developed a game in Java to test the generated dungeons}
        \\resumeItem{Contributed 50K+ lines of code to an established codebase via Git}
        \\resumeItem{Conducted  a human subject study to determine which video game dungeon generation technique is enjoyable}
        \\resumeItem{Wrote an 8-page paper and gave multiple presentations on-campus}
        \\resumeItem{Presented virtually to the World Conference on Computational Intelligence}
      \\resumeItemListEnd

  \\resumeSubHeadingListEnd


%-----------PROJECTS-----------
\\section{Projects}
`
  if (projects && projects.content && projects.content.length > 0) {
    ret += `
  \\resumeSubHeadingListStart
`
    projects.content.forEach((project) => {
      ret += `
        \\resumeProjectHeading
        {\\textbf{${project.title}} $|$ \\emph{${project.summary}}}{${project.startDate} -- ${project.endDate}}
        \\resumeItemListStart
          \\resumeItem{${project.description}}
        \\resumeItemListEnd
        `
    })
    ret += `
\\resumeSubHeadingListEnd

`
  }

  ret += `
    
%
%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
`
  if (skills && skills.content && skills.content.length > 0) {
    ret += `\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{`

    skills.content.forEach((skill) => {
      ret += `
      \\textbf{${skill.subHeader}}{: ${skill.details}} \\\\
      `
    })
    ret += `
      }}
      \\end{itemize}
      `
  }
  ret += `
%-------------------------------------------
\\end{document}
  `

  return ret
}

module.exports = texContent
