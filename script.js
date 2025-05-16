function formatDate(date) {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    const suffix = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    const ordinal = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
    
    return `${month} ${day}${ordinal},${year} ${hours}:${minutes}:${seconds}`;
}

function formatAmount(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2
    }).format(amount);
}

function generateReceipt() {
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('transactionType').value;
    const sender = document.getElementById('senderName').value;
    const receiver = document.getElementById('receiverName').value;
    const bank = document.getElementById('bankName').value;
    const account = document.getElementById('accountNumber').value;
    const date = document.getElementById('transactionDate').value;
    const reference = document.getElementById('referenceNumber').value;

    document.getElementById('receiptAmount').textContent = formatAmount(amount);
    document.getElementById('receiptType').textContent = type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('receiptSender').textContent = sender;
    document.getElementById('receiptReceiver').textContent = receiver;
    document.getElementById('receiptBank').textContent = bank;
    document.getElementById('receiptAccount').textContent = account.replace(/(\d{4})/g, '****');
    document.getElementById('receiptDate').textContent = formatDate(date);
    document.getElementById('receiptReference').textContent = reference;
}

function downloadReceipt() {
    const receipt = document.getElementById('receipt');
    
    html2canvas(receipt, {
        scale: 2,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'opay-receipt.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Set default date to current date and time
window.onload = function() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('transactionDate').value = now.toISOString().slice(0,16);
}