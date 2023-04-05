class Modal {
  constructor() {
    this._modal = document.getElementById('modal');
    this._modalBtn = document.getElementById('modal-btn');
    this.addEventListeners();
  }
  addEventListeners() {
    this._modalBtn.addEventListener('click', (e) => this.Open(e));
    window.addEventListener('click', (e) => this.outsideClick(e));
    document.addEventListener('closeModal', () => this.Close());
  }

  Open() {
    this._modal.style.display = 'block';
  }
  Close() {
    this._modal.style.display = 'none';
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.Close();
    }
  }
}

export default Modal;
