document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
      const courtId = button.getAttribute('data-court-id');
  
      // Toggle the button text and icon
      if (button.textContent.trim() === 'Favorite') {
        button.innerHTML = '<i class="material-icons">bookmark</i> Unfavorite';
        fetch(`/courts/${courtId}/favorite`, { method: 'PUT' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to favorite court');
            }
          })
          .catch(error => {
            console.error(error);
            // Revert the button text and icon
            button.innerHTML = '<i class="material-icons favorite">bookmark_border</i>';
          });
      } else {
        button.innerHTML = '<i class="material-icons">bookmark_border</i> Favorite';
        fetch(`/courts/${courtId}/favorite`, { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to unfavorite court');
            }
          })
          .catch(error => {
            console.error(error);
            // Revert the button text and icon
            button.innerHTML = '<i class="material-icons favorite">bookmark</i>';
          });
      }
    });
  });
  