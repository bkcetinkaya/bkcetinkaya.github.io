import os


# TO DO
# - 

# traverses the given directory and creates an html file for each txt in the directory

def traverse_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:

            path = os.path.join(root, file)

            file_name = os.path.basename(path)

            content = open(path, "rb")
            text = content.read().decode().replace('\n', '<br>')
            content.close()
            create_article_html(text, file_name)


def create_article_html(text, file_name):

    file_name_without_suffix = file_name.removesuffix('.txt')

    print(file_name_without_suffix)

    html_string = f""" 

            <!DOCTYPE html>
                <html>
                <head>
                    <title>{file_name_without_suffix}</title>
                    <link rel="stylesheet" href="../style.css">
                </head>
                <body>
                <header>

                <a href="/index.html"class="header_title">Berke K. Cetinkaya</a>
        
                <a href="../articles.html" class="header_title">Articles</a>
                
                              
                </header>
                <div class="container">
                <div class="h1" >{file_name_without_suffix}</h1> </div>

                    <div> <p class="p">{text}</p> </div>
                
                </div>
                    
                </body>
            </html>
            
                """

    html_file = open("./Generated/" + file_name_without_suffix+".html", "w")
    html_file.write(html_string)

    html_file.close()


traverse_directory("Articles")


# traverses the generated directory that contains the article html files, and returns the string that contains links to the articles

def create_article_page_string():

    articles = []

    for root, dirs, files in os.walk("Generated"):
        for file in files:

            path = os.path.join(root, file)

            file_name = os.path.basename(path)
            file_name_without_suffix = file_name.removesuffix('.html')
        
            


            html_string = f"""<li><a href="./generated/{file_name_without_suffix}.html">{file_name_without_suffix}</li></a>"""
            
            
            articles.append(html_string)

          
    string_to_place=""

    for item in articles:
        string_to_place += "\n" + item 
    
    return string_to_place


string_to_place = create_article_page_string()


def generate_articles_page(links):
    html_string = f""" 

            <!DOCTYPE html>
                <html>
                <head>
                    <title>Articles</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                <header>

                <a href="../index.html"class="header_title">Berke K. Cetinkaya</a>
        
                <a href="../articles.html" class="header_title">Articles</a>
                
                              
                </header>
                <div class="container">
                    <div class="article_links"> 
                        
                    <ul>
                        {links} 
                        
                    </ul>    
                        </div>
                </div>                   
                    
                </body>
            </html>
            
                """

    html_file = open("articles.html", "w")
    html_file.write(html_string)

    html_file.close()

generate_articles_page(string_to_place)