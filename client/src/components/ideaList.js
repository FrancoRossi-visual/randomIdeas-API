import ideasApi from '../services/ideasApi';
import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];

    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        console.log(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const response = await ideasApi.getIdeas();
      this._ideas = response.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        return `
     <div class="card" data-id="${idea._id}">
     <button class="delete"><i class="fas fa-times"></i></button>
     <h3>
       ${idea.text}
     </h3>
     <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
     <p>
       Posted on <span class="date">${idea.date}</span> by
       <span class="author">${idea.username}</span>
     </p>
   </div>
     `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
