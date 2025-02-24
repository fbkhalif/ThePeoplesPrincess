import React from "react"
import { LinkIcon } from "lucide-react"
import Link from "next/link"
const AboutPage = () => {
  return (
    <div className="container mx-auto py-8 px-20">
      <div className="mb-14">
        <h1 className="text-2xl text-center font-bold text-black">About Us</h1>
        <p className="text-primary text-xs py-4 text-center font-light md:px-20 lg:px-32 sm:px-4">
          Disclaimer: this site is in progress! Ran by Nina & Fai. Github:{" "}
        </p>
      </div>

      <h3 className="text-primary/75 font-bold text-lg mb-2">Our Mission</h3>

      <section className="mb-8 text-sm">
        <p className=" text-primary mb-4">
          We are a passionate team of Black women MIT grads and developers who
          want to use technology for good. During our time on social media, over
          the past few years, we noticed an overwhelming amount of Zelle and
          Venmo requests for mutual aid assistance, many of which got lost in
          the chaos. This inspired us to create a solution: a platform where
          mutual aid can be easily found and offered in a central location.
        </p>
        <p className=" text-primary mb-4">
          We're building this platform to make mutual aid more accessible.
          Whether you're seeking help or offering support, our mission is to
          connect people in need with those who can help, fostering a more
          supportive community. This is an ongoing project, as there are many
          features that we plan to add to limit friction between asking for help
          and getting it.
        </p>
        <p className=" bg-stone-50 mb-4">
          We are so grateful to have you be part of this growing community, and
          we're excited about the change we can create together.
        </p>

        <Link
          className="flex relative items-center max-w-fit mb-4 p-1.5 rounded-md border text-accent-light border-accent-light text-[12px]"
          href="https://github.com/fbkhalif/ThePeoplesPrincess">
          Github: ThePeoplesPrincess <LinkIcon className="h-3 w-3  ml-1" />
        </Link>
      </section>

      <section className="bg-accent-light/30 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-lg font-bold text-accent/85 mb-4">
          What We're Building:
        </h2>
        <ul className="text-sm list-inside text-accent-dark">
          <li className="mb-2">
            <strong>Centralized Mutual Aid Hub:</strong> A platform where mutual
            aid requests are gathered, ensuring that no post gets lost in the
            noise.
          </li>
          <li className="mb-2">
            <strong>Request Assistance:</strong> Easily post your needs for
            help, whether it's financial, food, or other forms of support.
          </li>
          <li className="mb-2">
            <strong>Offer Support:</strong> Browse through requests and provide
            assistance directly to those who need it the most.
          </li>
          <li className="mb-2">
            <strong>Community Focused:</strong> Build a strong, caring community
            by helping each other and making a difference together.
          </li>
          <li className="mb-2">
            <strong>Ongoing Updates:</strong> We're continually improving and
            adding new features to better serve our community.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-bold text-primary mb-4">Learn more</h2>
        <p className=" text-primary">
          Here are some sources detailing the power of mutual aid{" "}
        </p>
        <ul>
          <li>
            <a
              href="https://socialistforum.dsausa.org/issues/special-issue-the-covid-crisis/reclaiming-power-mutual-aid-in-the-united-states/"
              className="text-primary text-sm underline hover:text-slate-300 py-4 font-bold">
              Reclaiming Power: Mutual Aid in the United States
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/mutualaid/comments/c0a0v7/the_power_of_mutual_aid_in_the_us/"
              className="text-primary text-sm underline hover:text-slate-300 py-4 font-bold">
              The Power of Mutual Aid in the US
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default AboutPage
