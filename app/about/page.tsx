export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Welcome to my technical blog! I'm passionate about software development, 
          technology, and sharing knowledge with the community.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What I Write About</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Software Development</li>
          <li>Programming Languages</li>
          <li>Web Development</li>
          <li>Best Practices & Design Patterns</li>
          <li>Tech Tutorials & Guides</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Feel free to connect with me on social media or reach out via email. 
          I'm always happy to discuss tech topics and collaborate on interesting projects.
        </p>
      </div>
    </div>
  )
}
