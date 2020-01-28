pragma solidity >=0.4.21 <0.7.0;

contract Articles {
    // Save the owner address
    address admin;

    // Create struct for articles
    struct Article {
        uint id;
        address authorAdd;
        string authorName;
        string articleTitle;
        string articleContent;
        string dateCreated;
    }

    // Create mapping for articles
    mapping( uint => Article ) public articles;
    // Create mapping for authors and article count
    mapping( address => uint) authorArticleCount;
    // Variable to keep count of articles
    uint public articlesCount;

    // Event for article creation
    event articleCreated(uint id, address author, string name, string title, string content, string timestamp );

    // Constructor
    constructor() public {
        // The constructor calls private function to create genesis article
        // Also saves the admin address
        admin = msg.sender;
        _createGenesisArticle();
    }

    // Private function to create genesis article
    function _createGenesisArticle() private {
        articlesCount++;
        Article memory genesis = Article(
            articlesCount,
            msg.sender,
            "One",
            "...What's next ?",
            "...forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof...",
            "In the beggining"
        );

        // Add the genesis article to mapping
        articles[articlesCount] = genesis;

        // Add count of articles for address
        authorArticleCount[msg.sender]++;

        // Emit event
        emit articleCreated(
            genesis.id,
            genesis.authorAdd,
            genesis.authorName,
            genesis.articleTitle,
            genesis.articleContent,
            genesis.dateCreated
        );
    }

    // Public function to add article
    function createArticle(string memory _author, string memory _title, string memory _content, string memory _timestamp) public {
        articlesCount++;
        Article memory new_article = Article(
            articlesCount,
            msg.sender,
            _author,
            _title,
            _content,
            _timestamp
        );

        // Add the article to mapping
        articles[articlesCount] = new_article;

        // Add count of articles to address
        authorArticleCount[msg.sender]++;

        // Emit event
        emit articleCreated(
            new_article.id,
            new_article.authorAdd,
            new_article.authorName,
            new_article.articleTitle,
            new_article.articleContent,
            new_article.dateCreated
        );
    }
}