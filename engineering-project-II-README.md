# Engineering Project II (Acebook)

Software engineers nearly always work in teams. This week you will work in a simulated engineering team to build a Facebook clone. You will have tickets (tasks) to complete and an existing 'seed' project to work from. You will encounter authentic problems, and use authentic practices and tools to resolve them.

## Learning Objectives

This week your learning objectives are:

- Learn to navigate a legacy codebase.
- Learn to build production-quality software in a team.

These objectives are important because they describe exactly what your job will involve.

## Seed Repositories

Ask your coach if you're not sure which one your team should pick.

- [NodeJS & React](https://github.com/makersacademy/acebook-mern-vite)
- [Ruby/Rails](https://github.com/makersacademy/acebook-rails-template)
- [Java/Springboot](https://github.com/makersacademy/acebook-java-template)
- [NodeJS/Express](https://github.com/makersacademy/acebook-node-template)
- [Python/Flask](https://github.com/makersacademy/acebook-flask-template)
- [C#/ASP.NET](https://github.com/makersacademy/csharp-acebook-mvc-template)

### How will we know if our software is production-quality?

Organisations want to deliver great software to users in a timely fashion. Production-quality software is software that enables this. For example:

- **Testing.**  
  Tests help by making it easier to verify nothing has broken when you make changes. Untested code hinders this by making it easy to break things, resulting in going back over things and rework.

- **Readable code.**  
  Readability helps this by making it easier for developers to understand what is happening in the code, so that they can then change it. Hard-to-understand code means regularly having to ask your colleagues to unpick what they've written so that you can understand it, slowing down the delivery of the software.

- **Single Responsibility Principle.**  
  Modules following the single responsibility principle make it easier for developers to define and isolate the change to be made in a way that doesn't break anything else. Large, complex code modules are slow to change and hard to verify, slowing down the team and the software delivery.

So you will know if your software is production-quality if, at the end of the two weeks, you find it pleasant, easy, and quick to make changes to.

### How will we know if we're working well in a team?

You will know your team is working well if:

- **You're shipping features.**  
  Software, deployed, getting into the hands of the users — that is the aim of your work! But beware: it's easy to start off fast, but staying fast is the real challenge (and often involves starting slow).

- **Everyone is contributing.**  
  No one should be sitting around waiting, no one should be passively letting the team get on with things. If this happens, you are wasting energy that can be going into building software.

- **You feel good.**  
  That means you're well-rested, taking care of yourselves, speaking and listening to each other. Treat frustration like thirst — not a problem to suppress, but a helpful signal from yourself to surface and figure out how to fix. Don't stew!

- **You're proud of your work.**  
  If you know you're working together effectively, if you know you're building production-quality software, if you know you're learning and taking care of yourselves, you should be proud.

## Beginner Team Process

Software teams are organised in many ways, all of them united by the aim to create quality software in a timely fashion. Here's a guide for you as beginners:

### Team Setup

1. **Name your team.**  
   Choose something you all like (Coldplay?), and name your team after that!

2. **Agree your working practices.**  
   It is much easier to agree up front than find out you have differing views half way through. Consider agreeing and writing down these points:

   - When will you start and finish working for the day?
   - How often will you take breaks?
   - How will you know if you are working well as a team?
   - Your cycle of stand-ups and retrospectives?  
     Suggestion: stand-ups at the start of each day, and short retrospectives at the end of each day.
   - If someone feels frustrated or hopes for a change, how should they raise it with the team?
   - Anything else that has been an issue in past teams.

3. **Set up your project and card board.**

   1. Ask one person to fork the seed Github repository.
   2. Add team members and project coaches as project collaborators.
   3. Rename the repository to `acebook-<Team Name>`.
   4. Ask one person to duplicate [the Trello board template](https://trello.com/b/TENPp7H2/acebook-meta-sd-specialism).
   5. Rename the board with your team name.
   6. Add team members and project coaches.
   7. Update your Github `README.md` to link to the Trello board.

4. **Create a team Slack channel.**  
   Put links to your card board & Github repo in the title, and invite your coaches for this module.

5. **Get yourself a hot drink!**  
   That's the setup done.

### Planning

Software projects need replanning on a regular basis as things change. You will do this process multiple times.

As a team:

1. **Review the Trello board.**  
   Get a general update on what's changed since the last planning session. What have you done? What work is still in progress? Is anything blocked?

2. **Decide what to do next.**  
   How can you arrange the work so that everyone has something to do? Can you avoid working on the same areas of the codebase? If not, how will you coordinate?

3. **Estimate the work.**  
   Pick one of the tickets you've decided to do, and determine collectively how long you think it will take. Engineers often use t-shirt sizing (XS, S, M, L, XL) rather than time, to capture how 'complex' a task is.

   To do this, you'll need to think in a bit of detail what you'll need to do to achieve it. You might need to make some design decisions — note these on the card. You might find the ticket is better be split up into smaller tickets — feel free to do so.

4. **Allocate the tickets to pairs.**  
   Again, try to ensure you're maximising the contribution of everyone in the team.

5. **Get going!**  
   Take a break beforehand if you feel best.

### Coding

You'll be reasonably familiar with this bit, but there are some new collaborative steps too.

Each pair should:

1. **Assign themselves to the card and move it to 'In Progress'.**  
   In a real development team, this would make sure no one else takes it on!

2. **Create a branch for the change.**  
   Call it something relevant to the feature.

3. **Implement the change.**  
   This will involve pairing and programming, but it might also involve taking a bit of time out to research. As always, when pairing, make sure you take breaks, and make sure you're spending an equal amount of time driving and navigating.

4. **Create a pull request.**  
   When you're satisfied your work is production quality, create a pull request and ask the other team to review it. Make sure to respond to requests for review in a timely fashion to avoid wasted time.

5. **Respond to the review.**  
   Is your code perfect? Very unlikely at this point in your career! A good code review will involve comments and those comments should lead you to improve your code, so do that.

6. **When your PR is approved, merge your code into the main branch.**  
   If you've set up continuous integration, your tests will automatically be run at this point to ensure they pass after the merge. If you've set up continuous deployment, your change will automatically deploy too! These are marks of high quality in an engineering team, as the value gets to the users quickly.

Then it's back to the start! If you've not agreed as a team what to do next, then it's time for another planning session.

### Retrospection

Here are some points to consider at your retrospectives:

- How much fun did you have today? 1-10
- What have we implemented? Demo for each other!
- Are we wasting time anywhere?
- Do we have any quality concerns to address?
- Were our estimates accurate? What did we get forget about?

### Changes

In the real world tickets and requirements change regularly, both as developers learn about the problems and as organisations learn about their users. That's why Agile is called Agile — it's about being able to respond to change.

Your coaches will act as clients, and introduce new requirements in the course of the two weeks. Some of these may, as in real life, be challenging to implement given the decisions you have already made.

This is a normal part of being a software engineer. Consider, when implementing features, how you can anticipate likely future changes.

## Presentations

At the end of the project, each team will present the great work done.

You will talk through a very simple slide deck and do a quick demo of your project. There's no need to spend ages planning or practising the presentation. It's mainly to communicate about your learning, technical achievements, and show off your cool project to the rest of your cohort.

- You'll have 5 minutes to present.
- Try to practice your presentation at least once, but don't spend ages polishing it.
- A snapshot of your test coverage, quality, and deployment pipeline.
- How you documented your learning.
- How you worked as a team: what were your challenges and successes?
- Please demo a user using your app!

<!-- BEGIN GENERATED SECTION DO NOT EDIT -->

---

**How was this resource?**  
[😫](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fengineering-project-2&prefill_File=README.md&prefill_Sentiment=😫) [😕](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fengineering-project-2&prefill_File=README.md&prefill_Sentiment=😕) [😐](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fengineering-project-2&prefill_File=README.md&prefill_Sentiment=😐) [🙂](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fengineering-project-2&prefill_File=README.md&prefill_Sentiment=🙂) [😀](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fengineering-project-2&prefill_File=README.md&prefill_Sentiment=😀)  
Click an emoji to tell us.

<!-- END GENERATED SECTION DO NOT EDIT -->
