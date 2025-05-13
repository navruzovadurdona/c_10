<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Echo Bot</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
      animation: fadeIn 0.3s ease forwards;
    }
  </style>
</head>
<body class="bg-gradient-to-tr from-blue-200 to-purple-200 flex items-center justify-center min-h-screen">

  <div class="w-80 h-[540px] border-2 border-black rounded-lg outline outline-4 outline-black flex flex-col justify-between bg-white shadow-xl">

    <!-- Chat box -->
    <div id="chat-box" class="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col text-sm"></div>

    <!-- Input Area -->
    <div id="input-area" class="p-3 border-t border-gray-300 hidden">
      <div class="flex gap-2 items-center">
        <input type="text" id="user-input" placeholder="Xabar yozing..." class="flex-1 px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600 text-sm">
        <button onclick="sendMessage()" class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full">Yuborish</button>
        <button onclick="clearChat()" class="text-red-500 hover:text-red-700 text-lg" title="Tozalash">🗑</button>
      </div>
    </div>

    <!-- Start Button -->
    <button id="start-btn" onclick="startChat()" class="bg-cyan-400 text-black font-semibold text-center py-3 rounded-b-lg hover:bg-cyan-500">START</button>
  </div>

  <script>
    let started = false;
  
    function getTime() {
      const now = new Date();
      return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  
    function startChat() {
      started = true;
      document.getElementById('start-btn').classList.add('hidden');
      document.getElementById('input-area').classList.remove('hidden');
  
      const chatBox = document.getElementById('chat-box');
      const botMsg = document.createElement('div');
      botMsg.className = 'flex items-start space-x-2 fade-in';
      botMsg.innerHTML = `
        <div class="text-xl">🤖</div>
        <div class="bg-blue-100 px-3 py-2 rounded-lg max-w-[70%]">
          <p>Salom! Men Echo botman. Nima yozsangiz, shuni qaytaraman!</p>
          <span class="text-[10px] text-gray-500">${getTime()}</span>
        </div>`;
      chatBox.appendChild(botMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function sendMessage() {
      if (!started) return;
  
      const input = document.getElementById('user-input');
      const msg = input.value.trim();
      if (msg === '') return;
  
      const chatBox = document.getElementById('chat-box');
  
      // User message
      const userMsg = document.createElement('div');
      userMsg.className = 'flex items-end justify-end space-x-2 fade-in self-end';
      userMsg.innerHTML = `
        <div class="bg-green-100 px-3 py-2 rounded-lg max-w-[70%] text-right">
          <p>${msg}</p>
          <span class="text-[10px] text-gray-500">${getTime()}</span>
        </div>
        <div class="text-xl">🧑</div>`;
      chatBox.appendChild(userMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
      input.value = '';
  
      // Typing indicator
      const typing = document.createElement('div');
      typing.className = 'text-gray-400 text-xs fade-in';
      typing.textContent = 'Bot yozmoqda...';
      chatBox.appendChild(typing);
      chatBox.scrollTop = chatBox.scrollHeight;
  
      setTimeout(() => {
        typing.remove();
  
        // Bot responds with the same message that the user wrote
        const botMsg = document.createElement('div');
        botMsg.className = 'flex items-start space-x-2 fade-in';
        botMsg.innerHTML = `
          <div class="text-xl">🤖</div>
          <div class="bg-blue-100 px-3 py-2 rounded-lg max-w-[70%]">
            <p>${msg}</p>
            <span class="text-[10px] text-gray-500">${getTime()}</span>
          </div>`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 800);
    }
  
    function clearChat() {
      document.getElementById('chat-box').innerHTML = '';
    }
  </script>
  

</body>
</html>
