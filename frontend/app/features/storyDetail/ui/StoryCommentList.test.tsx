import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Comment } from "~/entities/comment";
import StoryCommentList from "./StoryCommentList";

const ids = [1, 2, 3];

const mocks = vi.hoisted(() => ({
  useCommentsGroup: vi.fn(),
}));

vi.mock("~/entities/comment/queries", () => ({
  useCommentsGroup: mocks.useCommentsGroup,
}));

const makeComment = (id: number, over: Partial<Comment> = {}): Comment => ({
  by: `user${id}`,
  id,
  parent: 1,
  text: `text ${id}`,
  time: 0,
  type: "comment",
  ...over,
});

const defaultResult = {
  data: undefined,
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
};

describe("StoryCommentList", () => {
  beforeEach(() => {
    mocks.useCommentsGroup.mockReset().mockReturnValue({ ...defaultResult });
  });

  it("показывает заглушку для пустого списка", () => {
    mocks.useCommentsGroup.mockReturnValue({
      ...defaultResult,
      data: [],
    });

    render(<StoryCommentList ids={ids} />);
    expect(screen.getByText("Комментариев нету")).toBeInTheDocument();
  });

  it("рендерит комментарии по id", () => {
    mocks.useCommentsGroup.mockReturnValue({
      ...defaultResult,
      data: [makeComment(1), makeComment(2)],
    });

    render(<StoryCommentList ids={ids} />);
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
    expect(screen.getByText("text 1")).toBeInTheDocument();
  });

  it("исключает удалённые и удаленные-синхронно комментарии", () => {
    mocks.useCommentsGroup.mockReturnValue({
      ...defaultResult,
      data: [
        makeComment(1),
        makeComment(2, { dead: true }),
        makeComment(3, { deleted: true }),
      ],
    });

    render(<StoryCommentList ids={ids} />);
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.queryByText("user2")).not.toBeInTheDocument();
    expect(screen.queryByText("user3")).not.toBeInTheDocument();
  });

  it("показывает ошибку при неудачной загрузке", () => {
    mocks.useCommentsGroup.mockReturnValue({
      ...defaultResult,
      data: undefined,
      isError: true,
    });

    render(<StoryCommentList ids={ids} />);
    expect(
      screen.getByText("Не удалось загрузить комментарии"),
    ).toBeInTheDocument();
  });

  it("показывает скелетоны во время загрузки", () => {
    mocks.useCommentsGroup.mockReturnValue({
      ...defaultResult,
      data: undefined,
      isLoading: true,
    });

    const { container } = render(<StoryCommentList ids={[1, 2]} />);
    expect(container.querySelectorAll("article")).toHaveLength(2);
  });
});