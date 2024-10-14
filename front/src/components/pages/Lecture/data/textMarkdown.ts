export const markdownText = `
# The best practice with zustand and more

When working with Zustand, a lightweight state management library for React, it's crucial 
to follow best practices to ensure efficient and maintainable code. 

## Key Points

1. **Organize your stores modularly**, keeping your logic decoupled and reusable. 
2. Use middleware for tasks like logging or persistence.
3. Ensure that your stores are kept lean by only including necessary state. 

Zustand's flexible API allows for better performance when using shallow comparison or selectors, 
which can optimize re-renders. Combined with React's features like suspense and concurrent rendering, 
Zustand can scale effectively in larger applications.
`;
