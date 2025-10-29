const ram = document.getElementById('ram');
const swap = document.getElementById('swap');
const addProcessBtn = document.getElementById('addProcess');
const swapBtn = document.getElementById('simulateSwap'); // o único botão de swap
const resetBtn = document.getElementById('reset');
const processNameInput = document.getElementById('processName');

const MAX_RAM = 4;
let ramProcesses = [];
let swapProcesses = [];
let selectedProcess = null;
let selectedLocation = null;

function render() {
  ram.innerHTML = '';
  swap.innerHTML = '';

  ramProcesses.forEach(p => {
    const el = document.createElement('div');
    el.classList.add('process');
    el.textContent = p;

    // destaque do processo selecionado
    if (selectedProcess === p && selectedLocation === 'ram') {
      el.classList.add('selected');
    }

    el.addEventListener('click', () => {
      selectedProcess = p;
      selectedLocation = 'ram';
      render();
    });

    ram.appendChild(el);
  });

  swapProcesses.forEach(p => {
    const el = document.createElement('div');
    el.classList.add('process');
    el.style.backgroundColor = '#ff4081';
    el.textContent = p;

    if (selectedProcess === p && selectedLocation === 'swap') {
      el.classList.add('selected');
    }

    el.addEventListener('click', () => {
      selectedProcess = p;
      selectedLocation = 'swap';
      render();
    });

    swap.appendChild(el);
  });
}

// Adicionar novo processo
addProcessBtn.addEventListener('click', () => {
  const name = processNameInput.value.trim();
  if (!name) return alert('Digite o nome do processo!');
  
  if (ramProcesses.length > MAX_RAM) {
   
    ramProcesses?.shift()
  }
ramProcesses.push(name)

  processNameInput.value = '';
  render();
});


swapBtn.addEventListener('click', () => {
  if (!selectedProcess || !selectedLocation)
    return alert('Selecione um processo!');

  if (selectedLocation === 'ram') {

    ramProcesses = ramProcesses.filter(p => p !== selectedProcess);
    swapProcesses.push(selectedProcess);
    alert(`Processo ${selectedProcess} movido para o Swap!`);
  } 
  else if (selectedLocation === 'swap') {
    if (ramProcesses.length >= MAX_RAM){
        ramProcesses?.shift()
    }

    swapProcesses = swapProcesses.filter(p => p !== selectedProcess);
    ramProcesses.push(selectedProcess);
    alert(`Processo ${selectedProcess} movido de volta para a RAM!`);
  }

  selectedProcess = null;
  selectedLocation = null;
  render();
});

// Reiniciar tudo
resetBtn.addEventListener('click', () => {
  ramProcesses = [];
  swapProcesses = [];
  selectedProcess = null;
  selectedLocation = null;
  render();
});

render();
