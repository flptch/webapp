document.getElementById('item-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('item-name').value;
  await fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  document.getElementById('item-name').value = '';
  loadItems();
});

async function loadItems() {
  const res = await fetch('/items');
  const items = await res.json();
  const list = document.getElementById('item-list');
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    list.appendChild(li);
  });
}

loadItems();