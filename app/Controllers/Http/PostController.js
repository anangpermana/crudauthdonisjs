"use strict";

const Post = use("App/Models/Post");

class PostController {
  async index({
    request,
    response,
    view,
    auth
  }) {
    const posts = await Post.all();
    const user = auth.user.toJSON()
    return view.render("posts.index", {
      posts: posts.rows,
      user: user
    });
  }

  create({
    request,
    response,
    view
  }) {
    return view.render("posts.create");
  }

  async store({
    request,
    response,
    view,
    session
  }) {
    const post = new Post();
    post.title = request.input("title");
    post.content = request.input("content");

    await post.save();

    session.flash({
      notification: "Data berhasil di simpan",
    });
    return response.route("posts.index");
  }

  async edit({
    request,
    response,
    view,
    params
  }) {
    const id = params.id;
    const post = await Post.find(id);

    return view.render("posts.edit", {
      post: post
    });
  }

  async update({
    request,
    response,
    view,
    params,
    session
  }) {
    const id = params.id;
    const post = await Post.find(id);

    post.title = request.input("title");
    post.content = request.input("content");

    await post.save();

    session.flash({
      notification: "Data berhasil di update"
    });
    return response.route("posts.index");
  }

  async delete({
    request,
    response,
    view,
    params,
    session
  }) {
    const id = params.id;
    const post = await Post.find(id);
    await post.delete();

    session.flash({
      notification: "Data berhasil di hapus"
    });
    return response.route("posts.index");
  }
}

module.exports = PostController;
