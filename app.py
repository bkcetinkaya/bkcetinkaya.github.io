import os

def traverse_directory(directory):
    for root,dirs,files in os.walk(directory):
        for file in files:
            
            path = os.path.join(root, file)
   
            file_name = os.path.basename(path)

            content = open(path,"rb")
            text = content.read().decode().replace('\n', '<br>')
            content.close()
            return text,file_name


text,file_name = traverse_directory("Articles")


file_name_without_suffix = file_name.removesuffix('.txt')



print(file_name_without_suffix)


htmlString = f""" 

        <!DOCTYPE html>
            <html>
            <head>
                <title>{file_name_without_suffix}</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
            <header>

            <a href=""class="header_title">Berke K. Cetinkaya</a>
     
            <a href="" class="header_title">Articles</a>
             
             
             
            </header>
                <div class="h1" >{file_name_without_suffix}</h1> </div>

                <div> <p class="p">{text}</p> </div>
            </body>
        </html>
        
            """




html_file = open(file_name_without_suffix+".html","w")
html_file.write(htmlString)

html_file.close()