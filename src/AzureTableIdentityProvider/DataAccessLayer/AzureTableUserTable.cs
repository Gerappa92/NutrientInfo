using Azure;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Identity;
using System;
using System.IO;
using System.Threading.Tasks;

namespace AzureTableIdentityProvider.DataAccessLayer
{
    public class AzureTableUserTable
    {
        private const string _userTableName = "ApplicationUser";
        private readonly TableClient _userTableClient;

        public AzureTableUserTable(string connectionString)
        {
            _userTableClient = new TableClient(connectionString, _userTableName);
            _userTableClient.CreateIfNotExists();
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user)
        {
            var response = await _userTableClient.AddEntityAsync(user);

            if(response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUser user)
        {
            var response = await _userTableClient.DeleteEntityAsync(user.PartitionKey, user.RowKey);

            if (response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId)
        {
            var pages = _userTableClient.QueryAsync<ApplicationUser>(u => u.Id == userId);
            ApplicationUser user = null;

            await foreach (var item in pages)
            {
                user = item;
                break;
            }

            return user;
        }
        public async Task<ApplicationUser> FindAsync(string partitionKey, string rowKey)
        {
            return await _userTableClient.GetEntityAsync<ApplicationUser>(partitionKey, rowKey);
        }

        public async Task<ApplicationUser> FindByNameAsync(string normalizedUserName)
        {
            var pages = _userTableClient.QueryAsync<ApplicationUser>(u => u.NormalizedName == normalizedUserName);
            ApplicationUser user = null;

            await foreach (var item in pages)
            {
                user = item;
                break;
            }

            return user;
        }

        public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail)
        {
            var pages = _userTableClient.QueryAsync<ApplicationUser>(u => u.NormalizedEmail == normalizedEmail);
            ApplicationUser user = null;

            await foreach (var item in pages)
            {
                user = item;
                break;
            }

            return user;
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user)
        {
            var response = await _userTableClient.UpdateEntityAsync<ApplicationUser>(user, ETag.All);

            if(response.IsError)
            {
                var error = GetError(response);
                return IdentityResult.Failed(error);
            }

            return IdentityResult.Success;
        }

        private IdentityError GetError(Azure.Response response)
        {
            string description = string.Empty;

            if (response.ContentStream != null)
            {
                using TextReader content = new StreamReader(response.ContentStream);
                description = content.ReadToEnd();
            }

            return new IdentityError
            {
                Code = response.Status.ToString(),
                Description = description
            };
        }
    }
}
