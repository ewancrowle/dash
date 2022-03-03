import {
  AcademicCapIcon,
  AdjustmentsIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

type Page = {
  title: string;
  icon: React.ReactElement;
  destination: string;
};

type Props = {
  page: number;
};

const pages: Page[] = [
  {
    title: "My Decks",
    icon: <BookOpenIcon className="h-5" />,
    destination: "/",
  },
  {
    title: "New Deck",
    icon: <PlusIcon className="h-5" />,
    destination: "/new/deck",
  },
  {
    title: "My Notes",
    icon: <DocumentTextIcon className="h-5" />,
    destination: "/notes",
  },
  {
    title: "Study",
    icon: <AcademicCapIcon className="h-5" />,
    destination: "/study",
  },
  {
    title: "My Profile",
    icon: <UserIcon className="h-5" />,
    destination: "/profile",
  },
  {
    title: "Preferences",
    icon: <AdjustmentsIcon className="h-5" />,
    destination: "/preferences",
  },
];

export const Layout: React.FC<Props> = (props) => {
  return (
    <div className="flex bg-white w-full h-screen">
      <div className="w-3/12 border-r p-3">
        <ul className="space-y-2 text-sm">
          {pages.map((page, index) => {
            if (index === props.page) {
              return (
                <li>
                  <Link href={page.destination}>
                    <a className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline">
                      <span className="text-gray-600">{page.icon}</span>
                      <span>{page.title}</span>
                    </a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li>
                  <Link href={page.destination}>
                    <a className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                      <span className="text-gray-600">{page.icon}</span>
                      <span>{page.title}</span>
                    </a>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="w-full">{props.children}</div>
    </div>
  );
};
