export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "understanding-swift-concurrency",
    title: "Understanding Swift Concurrency: From GCD to async/await",
    date: "2026-03-28",
    readingTime: "8 min read",
    tags: ["Concurrency", "Swift"],
    excerpt: "A deep dive into Swift's modern concurrency model and how it fundamentally changes the way we write asynchronous code on Apple platforms.",
    content: `
## The Evolution of Concurrency in Swift

For years, Grand Central Dispatch (GCD) was the backbone of concurrent programming on Apple platforms. While powerful, it came with its own set of challenges — callback hell, difficulty reasoning about execution order, and the ever-present risk of data races.

Swift 5.5 introduced structured concurrency with \`async/await\`, fundamentally changing how we write asynchronous code.

### The Old Way: GCD

\`\`\`swift
func fetchUser(id: String, completion: @escaping (Result<User, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        if let error = error {
            completion(.failure(error))
            return
        }
        guard let data = data else { return }
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            completion(.success(user))
        } catch {
            completion(.failure(error))
        }
    }.resume()
}
\`\`\`

### The New Way: async/await

\`\`\`swift
func fetchUser(id: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}
\`\`\`

The difference is striking. The async version reads like synchronous code — top to bottom, with clear error propagation through \`throws\`.

### Structured Concurrency with TaskGroup

One of the most powerful features is \`TaskGroup\`, which lets you spawn concurrent child tasks and collect their results:

\`\`\`swift
func fetchAllProfiles(ids: [String]) async throws -> [Profile] {
    try await withThrowingTaskGroup(of: Profile.self) { group in
        for id in ids {
            group.addTask { try await fetchProfile(id: id) }
        }
        var profiles: [Profile] = []
        for try await profile in group {
            profiles.append(profile)
        }
        return profiles
    }
}
\`\`\`

> Structured concurrency ensures that child tasks don't outlive their parent scope. This is a game-changer for preventing resource leaks.

### Actors: Safe Shared Mutable State

Actors provide a built-in mechanism for protecting shared mutable state. Unlike classes, actors serialize access to their properties:

\`\`\`swift
actor ImageCache {
    private var cache: [URL: UIImage] = [:]
    
    func image(for url: URL) -> UIImage? {
        cache[url]
    }
    
    func store(_ image: UIImage, for url: URL) {
        cache[url] = image
    }
}
\`\`\`

The compiler enforces that all access to an actor's state goes through its serialized executor, eliminating data races at compile time.

### Key Takeaways

- **async/await** makes asynchronous code linear and readable
- **TaskGroup** enables structured parallel execution
- **Actors** prevent data races at compile time
- **Sendable** protocol helps the compiler verify thread safety

Swift concurrency isn't just syntactic sugar — it's a fundamental shift in how we reason about concurrent code. The compiler becomes your ally in writing safe, performant concurrent programs.
    `,
  },
  {
    slug: "building-design-systems-swiftui",
    title: "Building a Scalable Design System in SwiftUI",
    date: "2026-03-15",
    readingTime: "6 min read",
    tags: ["SwiftUI", "Architecture"],
    excerpt: "How to architect a reusable component library in SwiftUI that scales across multiple apps and teams without becoming a maintenance burden.",
    content: `
## Why Build a Design System?

Every mature app eventually needs consistency. When your team grows beyond two or three developers, design drift becomes inevitable. Buttons look slightly different across screens. Spacing is inconsistent. Colors vary subtly.

A design system solves this by creating a single source of truth for your UI components.

### Token-Based Theming

Start with design tokens — the atomic values that define your visual language:

\`\`\`swift
enum DesignTokens {
    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
    }
    
    enum CornerRadius {
        static let small: CGFloat = 8
        static let medium: CGFloat = 12
        static let large: CGFloat = 16
    }
}
\`\`\`

### Component Architecture

Build components in layers. A button isn't just a button — it's a composition of typography, color, spacing, and interaction states:

\`\`\`swift
struct DSButton: View {
    let title: String
    let style: ButtonStyle
    let action: () -> Void
    
    enum ButtonStyle {
        case primary, secondary, ghost
    }
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(style.font)
                .foregroundColor(style.foregroundColor)
                .padding(.horizontal, DesignTokens.Spacing.lg)
                .padding(.vertical, DesignTokens.Spacing.md)
                .background(style.backgroundColor)
                .cornerRadius(DesignTokens.CornerRadius.medium)
        }
    }
}
\`\`\`

> The best design systems are invisible. Developers should reach for your components because they're the easiest path, not because they're mandated.

### ViewModifiers for Consistent Styling

SwiftUI's \`ViewModifier\` protocol is perfect for encapsulating reusable styles:

\`\`\`swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(DesignTokens.Spacing.lg)
            .background(Color(.systemBackground))
            .cornerRadius(DesignTokens.CornerRadius.large)
            .shadow(color: .black.opacity(0.08), radius: 12, y: 4)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}
\`\`\`

### Distribution via Swift Package

Package your design system as a Swift Package for easy distribution across projects. Use semantic versioning and maintain a changelog to communicate breaking changes clearly.

The investment in a design system pays dividends as your codebase grows. Start small, iterate often, and document everything.
    `,
  },
  {
    slug: "modern-ios-app-architecture",
    title: "Modern iOS App Architecture: Beyond MVC",
    date: "2026-02-20",
    readingTime: "10 min read",
    tags: ["Architecture", "SwiftUI"],
    excerpt: "Exploring practical patterns for structuring large-scale iOS applications — from MVVM to composable architecture and unidirectional data flow.",
    content: `
## The Architecture Problem

Every iOS developer has felt the pain of a Massive View Controller. A single file ballooning to 2,000+ lines, mixing networking, business logic, and UI code into an unmaintainable mess.

Modern SwiftUI apps face a similar challenge: Massive Views. Without discipline, SwiftUI views can become just as bloated as their UIKit predecessors.

### MVVM in SwiftUI

The most straightforward architecture for SwiftUI is MVVM. The \`@Observable\` macro (iOS 17+) makes this cleaner than ever:

\`\`\`swift
@Observable
class ProfileViewModel {
    var user: User?
    var isLoading = false
    var error: Error?
    
    private let userService: UserServiceProtocol
    
    init(userService: UserServiceProtocol) {
        self.userService = userService
    }
    
    func loadUser(id: String) async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            user = try await userService.fetchUser(id: id)
        } catch {
            self.error = error
        }
    }
}
\`\`\`

### Dependency Injection with Environment

SwiftUI's environment is a powerful DI container. Use it to inject services throughout your view hierarchy:

\`\`\`swift
struct UserServiceKey: EnvironmentKey {
    static let defaultValue: UserServiceProtocol = UserService()
}

extension EnvironmentValues {
    var userService: UserServiceProtocol {
        get { self[UserServiceKey.self] }
        set { self[UserServiceKey.self] = newValue }
    }
}
\`\`\`

> Good architecture is about managing complexity. The goal isn't to eliminate it — it's to put it in predictable places.

### Unidirectional Data Flow

For complex apps, consider unidirectional data flow. State changes flow in one direction: Action → Reducer → State → View.

\`\`\`swift
enum ProfileAction {
    case loadUser(String)
    case userLoaded(User)
    case loadFailed(Error)
}

func profileReducer(state: inout ProfileState, action: ProfileAction) {
    switch action {
    case .loadUser:
        state.isLoading = true
    case .userLoaded(let user):
        state.isLoading = false
        state.user = user
    case .loadFailed(let error):
        state.isLoading = false
        state.error = error
    }
}
\`\`\`

### Choosing the Right Architecture

There's no one-size-fits-all answer. Consider these factors:

- **Team size**: Larger teams benefit from stricter patterns
- **App complexity**: Simple apps don't need complex architecture
- **Testing requirements**: More separation = easier testing
- **SwiftUI vs UIKit**: SwiftUI's declarative nature changes the equation

Start simple. Extract when complexity demands it. The best architecture is the one your team can maintain.
    `,
  },
  {
    slug: "music-and-code",
    title: "What Playing Jazz Taught Me About Writing Code",
    date: "2026-01-10",
    readingTime: "5 min read",
    tags: ["Career", "Architecture"],
    excerpt: "Surprising parallels between jazz improvisation and software development — and why the best code, like the best music, comes from disciplined practice.",
    content: `
## The Practice Room and the IDE

I've been playing piano for fifteen years and writing code for ten. It took me a while to realize how deeply connected these two disciplines are.

Both require thousands of hours of deliberate practice. Both reward creativity within constraints. And in both fields, the masters make the difficult look effortless.

### Improvisation Requires Structure

In jazz, you can't improvise without first mastering the fundamentals. You need to know your scales, chord voicings, and harmonic theory before you can play a single meaningful improvised phrase.

Software development is the same. You can't "move fast and break things" effectively without understanding data structures, design patterns, and the fundamentals of your platform. The developers who ship the fastest are usually the ones with the deepest foundational knowledge.

> "You've got to learn your instrument. Then, you practice, practice, practice. And then, when you finally get up there on the bandstand, forget all that and just wail." — Charlie Parker

### Listening > Playing

The best jazz musicians spend more time listening than playing. They're deeply attuned to what the other musicians are doing — adjusting their dynamics, responding to unexpected changes, creating space for others to shine.

Great developers do the same. They read more code than they write. They understand the existing codebase before making changes. They leave room for other team members' contributions.

### The Importance of Rest

In music, the notes you *don't* play matter as much as the ones you do. Miles Davis was a master of space — his solos are defined as much by silence as by sound.

In code, what you choose *not* to build is often more important than what you build. Every feature has a maintenance cost. Every line of code is a liability. The best codebases are the ones where unnecessary complexity has been ruthlessly removed.

### Jamming and Pair Programming

There's a direct parallel between jamming with other musicians and pair programming. Both require:

- Active listening
- Willingness to follow as well as lead
- Building on each other's ideas
- Comfort with making mistakes in front of others

### The Craft

Both music and code are crafts. Not sciences, not arts — crafts. They require technical skill, creative thinking, and years of dedicated practice. And in both fields, the journey of improvement never really ends.

That's what keeps me coming back to both the piano and the keyboard.
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
