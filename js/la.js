let messages = [];
let ignoreCredits = false;
let base64String = null;
let img_generated = false;
let img_url = "";
let hasFile = false
let file_name = ""
let gURIs = [];
let conversation_thread_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

function copyText(button, str) {
  var nextElement = button.nextElementSibling;
  button.classList.remove("hidden");
  button.classList.add("btnNone");
  nextElement.style.display = "inline-block";

  setTimeout(() => {
    button.classList.add("hidden");
    button.classList.remove("btnNone");
    nextElement.style.display = "none";
  }, 2000);

  // Set up the click event to switch back to the copy button
  nextElement.addEventListener("click", function () {
    button.style.display = "inline-block";
    nextElement.style.display = "none";
  });

  navigator.clipboard.writeText(str);
}

var responses = [
  "Hello, Guest-kun. May I call you like that?",
  "",
  "I'm grateful. But still, I'm exhausted. Oh, I should buy meself new clothes",
];

const chatArea = document.getElementsByClassName("chatarea")[0];
const textArea = document.getElementById("textmessage");
const submitButton = document.getElementById("submit-message");
const clearChat = document.getElementById("clear-chat");
const loader = document.getElementById("loader");
const initialInputHeight = textArea.scrollHeight;

clearChat.onclick = () => {
  document.getElementById("chat-area").innerHTML = "";
  thread_id = "-1";
  messages = [];
  gURIs = [];
  conversation_thread_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

var responseCounter = 0;
var sendingOkay = true;
const submitMessage = async () => {

  let message = textArea.value.trim();
  if (!message) return;

    if(!sendingOkay) {
      return;
    }

  sendingOkay = false;

  submitButton.disabled = true;
  //textArea.value = "";
  let linkImgHtml = ''

 if(base64String != null) {
   linkImgHtml += `
       <div class="w-full pt-2 pb-2" style="max-width: 200px;">
           <img src="${base64String}" class="w-full h-full" alt="" />
       </div>
   `;
 } else if (hasFile) {

   linkImgHtml += `
       <div class="w-full pt-2 pb-4" style="max-width: 50px;">
           <img src="img/file-icon.svg" class="w-full h-full" style="width: 100%; height: 100%;" alt="" />
           <span class="text-sm" style="white-space: nowrap; color: ${font_color};">${file_name}</span>
       </div>
   `;

 }

 //textArea.value = "";
 textArea.style.height = `${initialInputHeight}px`;

 var imageFile = document.getElementById("filePicker").files[0];
 unlinkImg()

  //   submitButton.style.display = "none";
  // loader.style.display = "block";
  // Get the message from the textarea
  if (message || imageFile) {
    if (!message) {
      message = " ";
    }

    const escapedMessage = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
    var msgHtml = `<div class="flex items-start w-full group pb-4 mb-4">
    <div class="flex items-start w-5/6">
        <div
            class="inline-block rounded-full font-bold text-white text-center flex justify-center items-center w-12 h-12">
            <div class="w-12 h-12 text-2xl flex items-center justify-center -mt-1">
            <div class="rounded-full overflow-hidden size-8 md:size-12 flex-shrink-0">
                <img src="${user_img}" alt="">
            </div>
            </div>
        </div>
        <div class="ps-2">
            <h4 class="font-15 font-bold" style="font-family: ${font_face}, cursive; color: ${font_color};">User</h4>
              ${linkImgHtml}
              <p class="font-15" style="white-space: pre-wrap; font-family: ${font_face}, cursive; color: ${font_color};">${escapedMessage}</p>
        </div>
    </div>
    <div class="w-1/6 flex justify-center">
        <!-- copy to clipboard -->
        <button class="px-1 py-1 hidden group-hover:block" onclick="copyText(this, '${escapedMessage}')">
            <svg fill="${font_color}" width="24px" height="24px" viewBox="-3.6 -3.6 43.20 43.20" version="1.1"
                preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                    stroke="#CCCCCC" stroke-width="0.144" />

                <g id="SVGRepo_iconCarrier">
                    <title>Copy to Clipboard</title>
                    <path
                        d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"
                        class="clr-i-outline clr-i-outline-path-1" />

                    <path
                        d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"
                        class="clr-i-outline clr-i-outline-path-2" />

                    <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"
                        class="clr-i-outline clr-i-outline-path-3" />

                    <path
                        d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"
                        class="clr-i-outline clr-i-outline-path-4" />
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                </g>

            </svg>
        </button>

        <!-- copied button -->
        <button class="hidden px-1 py-1">
            <svg fill="${font_color}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px"
                viewBox="0 0 424.113 424.113" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path
                                d="M376.955,120.307c-6.514,0-11.807,5.286-11.807,11.807v215.593c0,22.785-18.539,41.322-41.322,41.322H64.936 c-22.781,0-41.322-18.537-41.322-41.322V88.816c0-22.786,18.541-41.323,41.322-41.323h258.89c6.525,0,11.809-5.287,11.809-11.807 c0-6.521-5.281-11.807-11.809-11.807H64.936C29.137,23.88,0,53.01,0,88.815v258.891c0,35.806,29.137,64.936,64.936,64.936h258.89 c35.812,0,64.938-29.13,64.938-64.936V132.113C388.762,125.594,383.482,120.307,376.955,120.307z" />
                            <path
                                d="M420.654,14.931c-4.611-4.612-12.096-4.612-16.693,0l-237.24,237.228l-59.297-59.291c-4.611-4.611-12.084-4.611-16.695,0 c-4.611,4.612-4.611,12.086,0,16.695l67.656,67.639c2.307,2.308,5.328,3.459,8.348,3.459c3.021,0,6.043-1.151,8.348-3.459 c0-0.006,0-0.012,0.012-0.018L420.654,31.625C425.266,27.017,425.266,19.539,420.654,14.931z" />
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </div>
    </div>`;

    textArea.value = "";

    var responseHtml = `
        <div class="flex items-start w-full group pt-2 pb-4 mb-4">
            <div class="flex items-start w-5/6">
                <div class="rounded-full overflow-hidden size-8 md:size-12 flex-shrink-0">
                    <img src="${imgURL}" alt="">
                </div>
                <div class="ps-2" id="block${responseCounter}" style="word-wrap: break-all;">
                    <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s; background: ${font_color};"></div>
                            <div class="typing-dot" style="--delay: 0.3s; background: ${font_color};"></div>
                            <div class="typing-dot" style="--delay: 0.4s; background: ${font_color};"></div>
                    </div>
                </div>
            </div>
            <div class="w-1/6 flex justify-center">
                <!-- copy to clipboard -->
                <button class="px-1 py-1 hidden group-hover:block" id="copy${responseCounter}">
                    <svg fill="${font_color}" width="24px" height="24px" viewBox="-3.6 -3.6 43.20 43.20" version="1.1"
                        preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                            stroke="#CCCCCC" stroke-width="0.144" />

                        <g id="SVGRepo_iconCarrier">
                            <title>Copy to Clipboard</title>
                            <path
                                d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"
                                class="clr-i-outline clr-i-outline-path-1" />

                            <path
                                d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"
                                class="clr-i-outline clr-i-outline-path-2" />

                            <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"
                                class="clr-i-outline clr-i-outline-path-3" />

                            <path
                                d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"
                                class="clr-i-outline clr-i-outline-path-4" />
                            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                        </g>

                    </svg>
                </button>

                <!-- copied button -->
                <button class="hidden px-1 py-1">
                    <svg fill="${font_color}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px"
                        viewBox="0 0 424.113 424.113" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path
                                        d="M376.955,120.307c-6.514,0-11.807,5.286-11.807,11.807v215.593c0,22.785-18.539,41.322-41.322,41.322H64.936 c-22.781,0-41.322-18.537-41.322-41.322V88.816c0-22.786,18.541-41.323,41.322-41.323h258.89c6.525,0,11.809-5.287,11.809-11.807 c0-6.521-5.281-11.807-11.809-11.807H64.936C29.137,23.88,0,53.01,0,88.815v258.891c0,35.806,29.137,64.936,64.936,64.936h258.89 c35.812,0,64.938-29.13,64.938-64.936V132.113C388.762,125.594,383.482,120.307,376.955,120.307z" />
                                    <path
                                        d="M420.654,14.931c-4.611-4.612-12.096-4.612-16.693,0l-237.24,237.228l-59.297-59.291c-4.611-4.611-12.084-4.611-16.695,0 c-4.611,4.612-4.611,12.086,0,16.695l67.656,67.639c2.307,2.308,5.328,3.459,8.348,3.459c3.021,0,6.043-1.151,8.348-3.459 c0-0.006,0-0.012,0.012-0.018L420.654,31.625C425.266,27.017,425.266,19.539,420.654,14.931z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.getElementById("chat-area").innerHTML += msgHtml;
    document.getElementById("chat-area").innerHTML += responseHtml;
    chatArea.scrollTop = chatArea.scrollHeight;

    let chatResponse = "";
    var noError = false;

   var fileSizeValid = !imageFile || (imageFile.size <= 60 * 1024 * 1024); // Check if file size is <= 12MB or if imageFile is not present

   if ((disableCredits || parseInt(document.getElementById('credits_user').innerHTML) > 0 || ignoreCredits) && fileSizeValid) {
     console.log(disableCredits);
     if (!disableCredits) {
      var generationsElement = document.getElementById('credits_user');
      var currentValue = parseInt(generationsElement.innerText);
      if (!ignoreCredits) {
        generationsElement.innerText = currentValue - 1;
      }
    }

   try {

     let userText = message;

     // Create a new FormData object
     var formData = new FormData();

     // Append JSON data
     formData.append('userText', userText);
     formData.append('botId', botId);
     formData.append('thread_id', thread_id);
     formData.append('messages', JSON.stringify(messages));
     formData.append('conversation_thread_id', conversation_thread_id);

     // Append the image file
     formData.append('uploadfile', imageFile);
     formData.append('gURIs', JSON.stringify(gURIs));

     // Make the fetch request
     const response = await fetch('/getResponseImage', {
         method: 'POST',
         body: formData // Set the body as FormData
     });
    // if (!response.ok) {
    //
    // }
     const debouncedDisplayMessage = debounce(displayMessage, 5);

     const reader = response.body.getReader();
     const decoder = new TextDecoder();
     let result = '';
     let isStreamed = false;
     let data;

     outerLoop: while (true) {
       const { done, value } = await reader.read();
       if (done) break;
       const chunk = decoder.decode(value, { stream: true });
       const lines = chunk.split('\n'); // Split by newline to handle multiple chunks

       for (const line of lines) {
         if (line.trim()) { // Ignore empty lines
           const parsedChunk = JSON.parse(line);
           //console.log(parsedChunk);
           const streamed = parsedChunk.streamed;
           data = parsedChunk;

           if (!streamed) {
            break outerLoop;
           }

           const content = parsedChunk.message;
           result += content;
           // Optionally, update the UI with partial results
           //console.log(result);
           data.message = result;
           debouncedDisplayMessage(responseCounter, result, noError, false);
         }
       }
     }

    console.log(data);
    console.log(data.message);
    chatResponse = data.message;

    if (data.aboutResponse) {
      noError = true;
    }

    if (data.img_generated) {
      img_generated = true;
      img_url = data.img_generated;
    }

    if (data.thread_id) {
      thread_id = data.thread_id;
    }

    if (data.file_name != null && data.mimetype != null) {
      gURIs.push([data.file_name, data.mimetype]);
    }

    if (chatResponse == "error_92930") {
      noError = true;
      chatResponse = "Something went wrong with this request, your credit was not used! Please try again or contact support if problem persists.";
      increaseCredits();
    } else if (chatResponse == "error_99530") {
      noError = true;
      chatResponse = "You have exhausted your credits for this app. Please obtain more credits to continue using the app.";
      increaseCredits();
    } else if (chatResponse == "error_29949") {
      noError = true;
      chatResponse = "This request is against the rules of the platform and could not be completed.";
      increaseCredits();
    } else if (chatResponse == "error_92103") {
      noError = true;
      chatResponse = "This bot has been made inactive by the creator. Please request them to reactivate it.";
      increaseCredits();
    } else if (chatResponse == "error_92933") {
      noError = true;
      chatResponse = "You don't have access to this bot. Please request the creator for access.";
      increaseCredits();
    } else if (chatResponse == "error_93000") {
      noError = true;
      chatResponse = "File format is not supported. Please use another file.";
      increaseCredits();
    } else if (chatResponse == "error_92003") {
      noError = true;
      chatResponse = "Please upgrade your plan to reactivate this bot. This message is only visible to you.";
      increaseCredits();
    } else if (chatResponse == "error_92910") {
      noError = true;
      chatResponse = "Please add your OpenAI key to continue using the bot.";
      increaseCredits();
      document.getElementById('chatgptkey-modal').classList.remove('hidden');
    } else {
      if (!isDiffusion) {
        messages.unshift(message, chatResponse);
      }
    }

  } catch (err) {
    console.log(err);
      noError = true;
      chatResponse = "Something went wrong with this request, your credit was not used. Please try again or contact support if problem persists.";
      increaseCredits();
  }

  } else if (!fileSizeValid) {
     noError = true;
     chatResponse = "Please keep the file size under 50 MB.";
  } else {
     noError = true;
     chatResponse = "You have exhausted your credits for this app. Please get more credits to continue using the app.";
  }

    if (messages.length >= 20) {
      messages.splice(18, 2);  // Removes 18th and 19th elements
    }

    if (gURIs.length > 6) {
      gURIs.splice(0, gURIs.length - 6);  // Removes the oldest entries to keep the length at 6
    }

    if (share_chat_btn && !noError) {
      document.getElementById('buttonShareChat').classList.remove('hidden');
    }

    setTimeout(() => {
      displayMessage(responseCounter, chatResponse, noError, true);
      sendingOkay = true;
      responseCounter++;
    }, 500);
    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
    document.getElementById('filePicker').value = '';
    base64String = null;
  }
};

const starterSubmit = (msg) => {
  textArea.value = msg;
  submitMessage();
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.getElementById('chatgptkey-modal-button').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value;

    if (apiKey.trim() == "") {return;}

    document.getElementById('chatgptkey-modal-button').disabled = true;
    document.getElementById('textkey').innerHTML = "Validating access...";
    // document.getElementById('chatgptkey-modal').style.display = "none";
    try {
        const keyResponse = await fetch('/updateOpenAIKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiKey, botId }),
        });

        if (!keyResponse.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await keyResponse.json();

        if (data.message !== "success") {
            document.getElementById('textkey').innerHTML = "Access code provided is invalid. Please request the app creator for the code.<br><br>";
            return;
        }

        // Handle success here, e.g., close modal or show success message
        document.getElementById('textkey').innerHTML = "Validation Successful.";

        document.getElementById('chatgptkey-modal').classList.add('hidden');

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('textkey').innerHTML = "Access code provided is invalid. Please request the app creator for the code.<br><br>";
    } finally {
        // Re-enable the button or perform other cleanup actions
        document.getElementById('chatgptkey-modal-button').disabled = false;
    }
});

const modes = {
  'css': 'text/css',
  'html': 'text/html',
  'js': 'text/javascript',
  'javascript': 'text/javascript',
  'ts': 'text/typescript',
  'typescript': 'text/typescript',
  'TypeScript': 'text/typescript',
  'jsx': 'text/jsx',
  'c': 'text/x-csrc',
  'c++': 'text/x-c++src',
  'java': 'text/x-java',
  'csharp': 'text/x-csharp',
  'c#': 'text/x-objectivec',
  'kotlin':'text/x-kotlin',
  'ceylon':'text/x-ceylon',
  'objective-c': 'text/x-objectivec',
  'coffeescript': 'text/coffeescript',
  'dart': 'application/dart',
  'django': 'django',
  'dockerfile':'dockerfile',
  'docker':'dockerfile',
  'jinja2': 'jinja2',
  'lua': 'lua',
  'livescript': 'livescript',
  'markdown': 'markdown',
  'nginx': 'text/x-nginx-conf',
  'php': 'text/x-php',
  'python': 'text/x-python',
}

const displayMessage = (counter, response, noError, isFinalResponse) => {
  var result = formatText2(response);
  var formatResponse = result.content;
  var codeblockRequired = false;
  if (isDalle && !noError) {
    formatResponse = formatText3(response, size);
  } else if (isDiffusion && !noError) {
    formatResponse = formatText4(response);
  } else {
    codeblockRequired = true;
  }

  if (img_generated) {
    formatResponse += formatText5(img_url);
    img_generated = false;
  }

  console.log(result);
  console.log(formatResponse);

  var defualtMsg = `<h4 class="font-15 font-bold" style="font-family: ${font_face}, sans-serif; color: ${font_color};">${botName}</h4>
    <p class="font-15" style="font-family: ${font_face}, sans-serif; color: ${font_color}; word-break: break-all;">${formatResponse}</p>`;
  document.getElementById(`block${counter}`).innerHTML = defualtMsg;

  document.getElementById(`copy${counter}`).addEventListener("click", function() {
    copyText(this, response);
  });
  
  if (isFinalResponse) {
    MathJax.typeset();
  }

  if (codeblockRequired && isFinalResponse) {
    result.codeblockIDs.forEach((textarea) => {
      setTimeout(() => {
        var lang = textarea.language.toLowerCase()
        var codemode = modes[lang]

        var editor = initializeCode(textarea.id, codemode, "monokai");
        adjustCodeMirrorWidth();
        document.getElementById(`copy-${textarea.id}`).addEventListener('click', function() {
          const button = this;
          const originalHTML = button.innerHTML;

          button.innerHTML = `<svg fill="#ffffff" height="15x" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "/> </g></svg>`;

          navigator.clipboard.writeText(editor.getValue()).then(() => {
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 3000);
          }).catch(err => {
              console.error('Failed to copy: ', err);
          });
        });

      }, 50);
    });
  }

  submitButton.disabled = false;

  loader.style.display = "none";
  // if (isFinalResponse) {
  //   chatArea.scrollTop = chatArea.scrollHeight;
  // }
};

submitButton.onclick = submitMessage;
textArea.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    submitMessage();
  }
});

function increaseCredits() {
  if (!disableCredits) {
    var generationsElement = document.getElementById('credits_user');
    var currentValue = parseInt(generationsElement.innerText);
    generationsElement.innerText = currentValue + 1;
  }
}

function formatText2(text) {
  const randomID = Math.floor(1000 + Math.random() * 9000);
  let codeblockIDs = [];

  const escapedUserText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const cleanedText = escapedUserText.replace(/【.*?†*】/g, '');
  // Add support for HTML tables
  const withTables = cleanedText.replace(
    /\|(.+?)\|\n\|(?:-+\|)+\n((?:\|.+?\|\n)*)/g,
    (match, headerRow, bodyRows) => {
      const headersArray = headerRow
        .trim()
        .split("|")
        .filter((cell) => cell.trim());
      const columnCount = headersArray.length;

      const headers = headersArray
        .map(
          (cell) =>
            `<th class="font-medium px-6 py-4 text-slate-100 dark:text-slate-200 text-left" style="color: ${font_color}; font-family: ${font_face};">${cell.trim()}</th>`
        )
        .join("");

      const body = bodyRows
        .trim()
        .split("\n")
        .map((row) => {
          const cells = row
            .trim()
            .split("|")
            .filter((cell) => cell.trim())
            .map(
              (cell) =>
                `<td class="dark:bg-slate-800 text-slate-100 dark:text-slate-400 whitespace-nowrap px-6 py-4 text-left" style="color: ${font_color}; font-family: ${font_face};">${cell.trim()}</td>`
            )
            .join("");
          return `<tr class="bg-black bg-opacity-20 border-b border-gray-800 dark:border-white/10 transition duration-300 ease-in-out hover:bg-zinc-700">${cells}</tr>`;
        })
        .join("");

      var responsiveTable = '';
      if (columnCount > 4) {
        responsiveTable = 'sm:-mx-6 lg:-mx-8';
      }

      return `<div class="flex flex-col overflow-x-auto chat-table-wrapper"><div class="${responsiveTable}"><div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"><div class="overflow-x-auto"><table class="min-w-full text-start text-sm font-light text-surface dark:text-white"><thead class="bg-gray-800 text-xs uppercase font-medium"><tr>${headers}</tr></thead><tbody class="bg-zinc-800">${body}</tbody></table></div></div></div></div>`;
    }
  );

  const linkText = withTables.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    `<a style='text-decoration: underline; color: ${font_color}; font-family: ${font_face};' target='_blank' href='$2'>$1</a>`
  );
  const boldText = linkText.replace(/\*\*(.*?)\*\*/g, `<b style="color: ${font_color}; font-family: ${font_face};">$1</b>`);
  const codeText = boldText.replace(
    /```([a-zA-Z0-9+#-]+)\s*([\s\S]*?)```/g,
    (match, language, code) => {
      const textareaID = `codeblock-${randomID}-${codeblockIDs.length}`;
      const copyButtonID = `copy-${textareaID}`;

      codeblockIDs.push({ id: textareaID, language: language });
      return `
        <div class="p-2 pb-0 rounded-md" style='background: #272822;'><div class=""><span style="float:left" class="inline-block rounded-md px-2 bg-stone-700 font-semibold mb-3">${language.toUpperCase()}</span><button style="float:right" id="${copyButtonID}"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z" fill="#ffffff"/> <path d="M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z" fill="#ffffff"/> </g></svg></button></div><textarea id="${textareaID}">${code}</textarea></div>`;
    }
  );

  const withLineBreaks = codeText.replace(
    /(?![^<]*<\/textarea>)(\n)/g,
    "<br />"
  );

  const replacedText = withLineBreaks.replace(
    /(?![^<]*<\/textarea>)###\s+([^\n<]+)/g,
    (match, heading) => {
      return `<h3 class="font-semibold" style="color: ${font_color}; font-family: ${font_face};">${heading.trim()}</h3>`;
    }
  );

  const codeTextWithStyledCode = replacedText.replace(
    /(?![^<]*<\/textarea>)`([\s\S]*?)`/g,
    `<code style='background-color: #404040; padding: 2px; font-family: ${font_face}; color: ${font_color};'>$1</code>`
  );

  const withMathjax = codeTextWithStyledCode.replace(
    /\*\*\*(.*?)\*\*\*/g,
    (match, equation) => {
      return `<div class="math-equation" style="color: ${font_color}; font-family: ${font_face};">$$${equation}$$</div>`;
    }
  );

  return {
    content: withMathjax,
    codeblockIDs: codeblockIDs,
  };
}

function formatText3(text, size) {

  const dimensions = size.split('x');
  const width = dimensions[0];
  const height = dimensions[1];

  const htmlTemplate = `Here is your requested image:<br><br>
    <img src="${text}" style="width:100%; height:auto;" alt="Requested Image"><br>
Remember that this bot does not save context, and each request is treated as a new one.
  `;

  return htmlTemplate;
}

function formatText5(url) {

  const htmlTemplate = `<br><br>
    <img src="${url}" style="width:70%; height:auto;" alt="Requested Image">`;

  return htmlTemplate;
}

function formatText4(text) {

  const htmlTemplate = `Here is your requested image:<br><br>
    <img src="data:image/png;base64, ${text}" style="width:100%; height:auto;" alt="Requested Image"><br><br>
Remember that this bot does not save context, and each request is treated as a new one.
  `;

  return htmlTemplate;
}

textArea.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    textArea.style.height = `${initialInputHeight}px`;
    textArea.style.height = `${textArea.scrollHeight}px`;
});

// convert img to base64
const fileInput = document.querySelector('#filePicker');
const customFileButton = document.querySelector('#customFileButton');

customFileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    if (file.type.startsWith('image/')) {

    reader.onloadend = () => {
        // use a regex to remove data url part
        base64String = reader.result;
        document.getElementsByClassName('img-placeholder')[0].innerHTML =
        `
            <div class="link-img-wrp relative pt-2 ps-2 inline-block">
                <div style="width: 80px; height: 80px;">
                    <button type='button' onclick="unlinkImg()" class="absolute top-1 right-0 cursor-pointer">
                        <svg width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#ffffff"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g>

                        </svg>
                    </button>
                    <div class="rounded-xl overflow-hidden">
                        <img src="${base64String}" alt="" class="h-full w-full" />
                    </div>
                </div>
            </div>
        `;
    };
    reader.readAsDataURL(file);

  } else {

    reader.onloadend = () => {
        // use a regex to remove data url part
        uploadedFile = reader.result;
        let fileType = file.type;
        file_name = file.name;
        hasFile = true;
        base64String = null;

        document.getElementsByClassName('img-placeholder')[0].innerHTML =
        `
            <div class="link-img-wrp relative pt-2 ps-2 inline-block">
                <div style="width: 80px; height: 80px;">
                    <button type='button' onclick="unlinkImg()" class="absolute top-1 right-0 cursor-pointer">
                        <svg width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff">

                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                            <g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#ffffff"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g>

                        </svg>
                    </button>
                    <div class="rounded-xl overflow-hidden">
                        <div class="">
                          <img src="img/file-icon.svg" alt="CSV Icon" style="width: 65px;" class="" />
                          <div style="font-size: 12px;">${file.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    reader.readAsArrayBuffer(file);
  }
});

let unlinkImg = () => {
    base64String = null;
    fileInput.value = null;
    hasFile = false;
    fileInput.dispatchEvent(new Event('change'));
    document.getElementsByClassName('img-placeholder')[0].innerHTML = '';
};

function adjustCodeMirrorWidth() {
  let element = document.getElementById("layout-guide-codemirror");
  if (element) {
    let elementWidth = element.offsetWidth;
    let codeMirrorElements = document.querySelectorAll(".CodeMirror");
    codeMirrorElements.forEach(function (codeMirror) {
      codeMirror.style.width = elementWidth + "px";
    });
  }
}

function initializeCode(textarea, mode, theme) {
  var editor = CodeMirror.fromTextArea(document.getElementById(textarea), {
    mode: mode,
    theme: theme,
    readOnly: true,
    lineNumbers: true,
    autoCloseTags: true,
    lineWrapping: true,
  });
  editor.setSize("100%", "100%");

  return editor
}

document.addEventListener("DOMContentLoaded", function () {
  adjustCodeMirrorWidth(); // Adjust width on page load
  window.addEventListener("resize", adjustCodeMirrorWidth); // Adjust width on window resize
});
