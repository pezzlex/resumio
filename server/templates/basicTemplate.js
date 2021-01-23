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
`
  if (education && education.content && education.content.length > 0) {
    ret += `
  \\resumeSubHeadingListStart
  `
    education.content.forEach((edu) => {
      ret += `
    \\resumeSubheading
    {${edu.collegeName}}{${edu.city}, ${edu.state}}
    {${edu.degree}}{${edu.startDate} -- ${edu.endDate}}
    `
    })

    ret += `
\\resumeSubHeadingListEnd
`
  }

  ret += `
%-----------EXPERIENCE-----------
\\section{Experience}
  `
  if (
    workExperience &&
    workExperience.content &&
    workExperience.content.length > 0
  ) {
    ret += `\\resumeSubHeadingListStart
`
    workExperience.content.forEach((workEx) => {
      ret += `
  \\resumeSubheading
      {${workEx.jobTitle}}{${workEx.startDate} -- ${workEx.endDate}}
      {${workEx.companyName}}{${workEx.city}, ${workEx.state}}
      \\resumeItemListStart
        \\resumeItem{${workEx.description}}
      \\resumeItemListEnd
  `
    })

    ret += `
  \\resumeSubHeadingListEnd
  `
  }

  ret += `
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
